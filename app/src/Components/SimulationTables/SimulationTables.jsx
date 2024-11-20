import React from 'react';
import './SimulationTables.css';
const SimulationTables = ({ registers, memory }) => {
  return (
    <div id="simulation-tables" className='tables-container'>
      <table id="registerTable" className='table'>
        <thead>
          <tr className='values'>
            <th>Register</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(registers).map((reg) => (
            <tr key={reg} className='values'>
              <td>{reg}</td>
              <td>{`0x${registers[reg].toString(16).toUpperCase()}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table id="ramTable" className='table' >
        <thead>
          <tr className='values'>
            <th>Address</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(memory).map((addr) => (
            <tr key={addr} className='values'>
              <td>{`0x${parseInt(addr).toString(16).toUpperCase()}`}</td>
              <td>{`0x${memory[addr].toString(16).toUpperCase()}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimulationTables;
