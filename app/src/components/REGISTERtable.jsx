import React, { useEffect, useRef, useState } from 'react';
import '../styles/Tables.css';

const REGISTERtable = ({ registers }) => {
  const [highlighted, setHighlighted] = useState({});
  const prevRegisters = useRef({});

  useEffect(() => {
    const updated = {};
    Object.keys(registers).forEach(reg => {
      if (prevRegisters.current[reg] !== undefined && prevRegisters.current[reg] !== registers[reg]) {
        updated[reg] = true;
        setTimeout(() => {
          setHighlighted(prev => ({ ...prev, [reg]: false }));
        }, 1000);
      }
    });
    setHighlighted(prev => ({ ...prev, ...updated }));
    prevRegisters.current = registers;
  }, [registers]);

  return (
    <div className='tables-container'>
      <table className='REGISTERtable'>
        <thead>
          <tr>
            <th>Register</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(registers).map(reg => (
            <tr key={reg}>
              <td>{reg}</td>
              <td className={highlighted[reg] ? 'cell-updated' : ''}>
                {`0x${(registers[reg] >>> 0).toString(16).toUpperCase().padStart(8, '0')}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default REGISTERtable;
