import React, { useState } from 'react';
import REGISTERtable from './REGISTERtable';
import '../styles/Tables.css';

const RegisterTabs = ({ registers }) => {
  const [activeTab, setActiveTab] = useState('S');

  const registerGroups = {
    S: Object.fromEntries(Object.entries(registers).filter(([key]) => /^s\d+$/.test(key))),
    T: Object.fromEntries(Object.entries(registers).filter(([key]) => key.startsWith("t"))),
    A: Object.fromEntries(Object.entries(registers).filter(([key]) => key.startsWith("a"))),
    V: Object.fromEntries(Object.entries(registers).filter(([key]) => key.startsWith("v"))),
    Especiales: Object.fromEntries(Object.entries(registers).filter(([key]) =>
      ["zero", "at", "k0", "k1", "gp", "sp", "fp", "ra", "lo", "hi", "fcc", "status", "Cause", "EPC"].includes(key)
    )),
    Float: Object.fromEntries(Object.entries(registers).filter(([key]) => key.startsWith("f")))
  };

  const tabs = Object.keys(registerGroups);
  console.log("RR" + registerGroups[activeTab])
  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <REGISTERtable registers={registerGroups[activeTab]} />
      </div>
    </div>
  );
};

export default RegisterTabs;
