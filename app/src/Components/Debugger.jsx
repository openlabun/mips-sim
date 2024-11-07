import React from 'react';

const Debugger = ({ PC, mipsInput }) => {
  const instructions = mipsInput.trim().split('\n');

  return (
    <div id="debugger-info">
      <p>PC: {PC}</p>
      <p>Current instruction: {instructions[PC] ?? null}</p>
      <p>Previous instruction: {instructions[PC - 1] ?? null}</p>
    </div>
  );
};

export default Debugger;
