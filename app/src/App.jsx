import React from 'react';
import MIPS from './components/MIPS';

function App() {
  return (
    <div
      style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '0.5rem',
          gap: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MIPS />
      </div>
    </div>
  );
}

export default App;
