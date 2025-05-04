import React from 'react';
import '../styles/Tables.css';

const RAMtable = ({ memory }) => {
  return (
    <div id="simulation-tables" className='tables-container'>
      <table id="ramTable" className='RAMtable' >
        <thead>
          <tr className='values'>
            <th>Address</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(memory)
            .filter((addr) => Number.parseInt(addr) <= 0xf)
            .map((addr) => {
              const isZero = memory[addr] === 0
              return (
                <tr key={addr} className="values">
                  <td>{`0x${Number.parseInt(addr).toString(16).toUpperCase()}`}</td>
                  <td className={isZero ? "zero-value" : ""}>{`0x${memory[addr].toString(16).toUpperCase()}`}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RAMtable;
