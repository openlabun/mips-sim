import React from 'react';
import './Debugger.css';
const Debugger = ({ PC, mipsInput, stepMIPS, stepBackMIPS, resetMIPS }) => {
  const instructions = mipsInput.trim().split('\n');

  return (
    <div id="debugger">
      <h2>Debugger</h2>
      <button onClick={stepMIPS}>Step In</button>
      <button onClick={stepBackMIPS}>Step Back</button>
      <button onClick={resetMIPS}>Reset</button>
      <div id="debugger-info">
        <p>PC: {PC}</p>
        <p>Current instruction: {instructions[PC] ?? 'N/A'}</p>
        <p>Previous instruction: {instructions[PC - 1] ?? 'N/A'}</p>
      </div>
    </div>
  );
};

export default Debugger;
