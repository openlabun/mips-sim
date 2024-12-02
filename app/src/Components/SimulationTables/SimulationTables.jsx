import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Debugger from "../Debugger";
import "./SimulationTables.css";

const SimulationTables = ({
  registers,
  memory,
  PC,
  mipsInput,
  stepMIPS,
  stepBackMIPS,
  currentInstruction,
  start,
  resetMIPS,
}) => {
  const [registerData, setRegisterData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);

  useEffect(() => {
    const updatedRegisterData = Object.keys(registers).map((reg) => ({
      register: reg,
      value: `0x${registers[reg].toString(16).toUpperCase()}`,
    }));
    setRegisterData(updatedRegisterData);
  }, [registers]);

  useEffect(() => {
    const updatedMemoryData = Object.keys(memory).map((addr) => ({
      address: `0x${parseInt(addr).toString(16).toUpperCase()}`,
      value: `0x${memory[addr].toString(16).toUpperCase()}`,
    }));
    setMemoryData(updatedMemoryData);
  }, [memory]);

  return (
    <div id="simulation-tables" className="tables-container">
      <DataTable
        value={registerData}
        id="registerTable"
        scrollHeight="30rem"
        style={{ width: "25%" }}
      >
        <Column field="register" header="Register"></Column>
        <Column field="value" header="Value"></Column>
      </DataTable>
      <Debugger
        PC={PC}
        mipsInput={mipsInput}
        stepMIPS={stepMIPS}
        stepBackMIPS={stepBackMIPS}
        resetMIPS={resetMIPS}
        currentInstruction={currentInstruction}
        start={start}
      />
      <DataTable
        value={memoryData}
        id="ramTable"
        scrollHeight="30rem"
        style={{ width: "25%" }}
      >
        <Column field="address" header="Address"></Column>
        <Column field="value" header="Value"></Column>
      </DataTable>
    </div>
  );
};

export default SimulationTables;
