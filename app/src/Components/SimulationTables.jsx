import React from 'react';

const SimulationTables = ({ registers, memory }) => {
  const updateTables = () => {
    // Lógica para actualizar las tablas con los valores de registros y memoria
  };

  return (
    <div id="simulation-tables">
      <table id="registerTable">
        <thead>
          <tr>
            <th>Register</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(registers).map((reg) => (
            <tr key={reg}>
              <td>{reg}</td>
              <td>{`0x${registers[reg].toString(16).toUpperCase()}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table id="ramTable">
        <thead>
          <tr>
            <th>Address</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(memory).map((addr) => (
            <tr key={addr}>
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
