import React from "react";
import "./SimulationTables.css";
import Debugger from "../Debugger";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
  const registerData = Object.keys(registers).map((reg) => ({
    register: reg,
    value: `0x${registers[reg].toString(16).toUpperCase()}`,
  }));
  const memoryData = Object.keys(memory).map((addr) => ({
    address: `0x${parseInt(addr).toString(16).toUpperCase()}`,
    value: `0x${memory[addr].toString(16).toUpperCase()}`,
  }));
  return (
    <div id="simulation-tables" className="tables-container">
      <DataTable value={registerData} scrollable scrollHeight="30rem">
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
      <DataTable value={memoryData} scrollable scrollHeight="30rem">
        <Column field="address" header="Address"></Column>
        <Column field="value" header="Value"></Column>
      </DataTable>
    </div>
  );
};

export default SimulationTables;
