import React, { useEffect, useRef, useState } from 'react';
import '../styles/Tables.css';

const RAMtable = ({ memory }) => {
  const [highlightedCells, setHighlightedCells] = useState({});
  const prevMemory = useRef({});

  useEffect(() => {
    const newHighlights = {};
    Object.keys(memory).forEach(addr => {
      if (prevMemory.current[addr] !== undefined && prevMemory.current[addr] !== memory[addr]) {
        newHighlights[addr] = true;
        
        setTimeout(() => {
          setHighlightedCells(prev => ({ ...prev, [addr]: false }));
        }, 1000);
      }
    });
    setHighlightedCells(prev => ({ ...prev, ...newHighlights }));
    prevMemory.current = memory;
  }, [memory]);

  return (
    <div className='tables-container'>
      <table className='RAMtable'>
        <thead>
          <tr>
            <th>Address</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(memory)
            .filter(addr => parseInt(addr) <= 0x1F)

            .map(addr => (
              <tr key={addr}>
                <td>{`0x${parseInt(addr).toString(16).toUpperCase()}`}</td>
                <td className={highlightedCells[addr] ? 'cell-updated' : ''}>
                  {`0x${memory[addr].toString(16).toUpperCase()}`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RAMtable;
