import React, { useState } from "react";
import Debugger from "./Debugger";
import DropArea from "./Drop";
import "../styles/MIPS.css";
import RAMtable from "./RAMtable";
import REGISTERtable from "./REGISTERtable";
import CircuitImage from './Circuit';

const initialRegisters = {
  zero: 0, at: 0, v0: 0, v1: 0,
  a0: 0, a1: 0, a2: 0, a3: 0,
  t0: 0, t1: 0, t2: 0, t3: 0,
  t4: 0, t5: 0, t6: 0, t7: 0,
  s0: 0, s1: 0, s2: 0, s3: 0,
  s4: 0, s5: 0, s6: 0, s7: 0,
  t8: 0, t9: 0, k0: 0, k1: 0,
  gp: 0, sp: 0, fp: 0, ra: 0,
};

const initialMemory = Array.from({ length: 32 }).reduce(
  (acc, curr, i) => ({ ...acc, [i]: 0 }),
  {}
);

const MIPS = () => {
  const [mipsInput, setMipsInput] = useState("");
  const [hexInput, setHexInput] = useState("");
  const [registers, setRegisters] = useState(initialRegisters);
  const [memory, setMemory] = useState(initialMemory);
  const [PC, setPC] = useState(0);
  const [history, setHistory] = useState([]);
  const instructions = mipsInput.trim().split("\n");
  const currentInstruction = instructions[PC] || '';

  const updateTables = (newRegisters, newMemory) => {
    setRegisters(newRegisters);
    setMemory(newMemory);
  };

  const simulateMIPS = () => {
    const instructions = mipsInput.trim().split("\n");
    let currentPC = PC;
    let newRegisters = { ...registers };
    let newMemory = { ...memory };
  
    while (currentPC < instructions.length) {
      
      setHistory((prevHistory) => [
        ...prevHistory,
        { PC: currentPC, registers: { ...newRegisters }, memory: { ...newMemory } },
      ]);
  
      
      const nextPC = executeMIPSInstruction(instructions[currentPC], newRegisters, newMemory, currentPC);
  
      
      currentPC = nextPC !== undefined ? nextPC : currentPC + 1;
    }
  
    
    setRegisters(newRegisters);
    setMemory(newMemory);
    setPC(currentPC);
    updateTables(newRegisters, newMemory);
  };
  

  const stepMIPS = () => {
    const instructions = mipsInput.trim().split("\n");
    if (PC >= instructions.length) return;
    setHistory([
      ...history,
      { PC, registers: { ...registers }, memory: { ...memory } },
    ]);
 
    const newRegisters = { ...registers };
    const newMemory = { ...memory };
    const newPC = executeMIPSInstruction(instructions[PC], newRegisters, newMemory, PC);
 
    if (newPC !== undefined) {
      console.log(newPC);
      setPC(newPC);

    }else {
      setPC(PC + 1);
    }
 
    updateTables(newRegisters, newMemory);
  };

  const stepBackMIPS = () => {
    if (PC === 0) return;

    const lastHistoryIndex = history.length - 1;
    const lastState = history[lastHistoryIndex];

    if (lastState) {
      setPC(lastState.PC);
      setRegisters(lastState.registers);
      setMemory(lastState.memory);
      setHistory(history.slice(0, lastHistoryIndex));
    }
  };

  const resetMIPS = () => {
    setPC(0);
    setHistory([]);
    setRegisters(initialRegisters);
    setMemory(initialMemory);
  };
 

  return (
    <div>
     
      <div className="row-container">
        <DropArea setMipsInput={setMipsInput} setHexInput={setHexInput} />
        <textarea
          id="mips-input"
          className="input-text-area"
          placeholder="Enter MIPS instructions here..."
          value={mipsInput}
          onChange={(e) => setMipsInput(e.target.value)}
        />
        
      </div>
      

     
      <CircuitImage currentInstruction={currentInstruction} registers={registers} />
      <div className="bottom-section">
  <RAMtable memory={memory} />
  <Debugger
    PC={PC}
    simulateMIPS={simulateMIPS}
    mipsInput={mipsInput}
    stepMIPS={stepMIPS}
    stepBackMIPS={stepBackMIPS}
    resetMIPS={resetMIPS}
  />

<div style={{
  backgroundColor: registers._overflow ? '#ff4d4f' : '#e0e0e0',
  color: registers._overflow ? 'white' : 'black',
  padding: '10px',
  margin: '1rem 0',
  borderRadius: '8px',
  textAlign: 'center',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
}}>
  {registers._overflow
    ? '⚠️ ¡Overflow detectado en la última instrucción!'
    : '✅ Sin overflow detectado'}
</div>



 

  {}
  <div
    className="instruction-list"
    style={{
      backgroundColor: "#f8f9fa",
      border: "1px solid #dee2e6",
      borderRadius: "8px",
      padding: "1rem",
      marginTop: "1rem",
      maxHeight: "200px",
      overflowY: "auto",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      width: "100%",
    }}
  >
    <h4 style={{ marginBottom: "0.5rem", fontSize: "1rem", fontWeight: "bold" }}>
      Instruction Viewer
    </h4>
    {mipsInput.trim().split('\n').map((inst, index) => (
      <pre
        key={index}
        style={{
          backgroundColor: index === PC ? '#ffefc1' : 'transparent',
          fontWeight: index === PC ? 'bold' : 'normal',
          padding: '4px 8px',
          borderRadius: '4px',
          margin: 0,
        }}
      >
        {inst}
      </pre>
    ))}
  </div>
 

  <REGISTERtable registers={registers} />
</div>


    </div>
   
  );
};

function executeMIPSInstruction(instruction, registers, memory, PC) {
  const [op, ...operands] = instruction.trim().split(/\s+/);

  
  registers._overflow = false;

  switch (op) {
    case "add": {
      const [rd, rs, rt] = operands;
      const a = registers[rs] | 0;
      const b = registers[rt] | 0;
      const result = (a + b) | 0;
      const overflow = (a > 0 && b > 0 && result < 0) || (a < 0 && b < 0 && result > 0);
      registers[rd] = result;
      registers._overflow = overflow;
      break;
    }
    case "addu": {
      const [rd, rs, rt] = operands;
      registers[rd] = (registers[rs] >>> 0) + (registers[rt] >>> 0);
      break;
    }
    case "sub": {
      const [rd, rs, rt] = operands;
      const a = registers[rs] | 0;
      const b = registers[rt] | 0;
      const result = (a - b) | 0;
      const overflow = (a > 0 && b < 0 && result < 0) || (a < 0 && b > 0 && result > 0);
      registers[rd] = result;
      registers._overflow = overflow;
      break;
    }
    case "subu": {
      const [rd, rs, rt] = operands;
      registers[rd] = (registers[rs] >>> 0) - (registers[rt] >>> 0);
      break;
    }
    case "and": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] & registers[rt];
      break;
    }
    case "or": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] | registers[rt];
      break;
    }
    case "nor": {
      const [rd, rs, rt] = operands;
      registers[rd] = ~(registers[rs] | registers[rt]);
      break;
    }
    case "slt": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] < registers[rt] ? 1 : 0;
      break;
    }
    case "sltu": {
      const [rd, rs, rt] = operands;
      registers[rd] = (registers[rs] >>> 0) < (registers[rt] >>> 0) ? 1 : 0;
      break;
    }
    case "sll": {
      const [rd, rt, shamt] = operands;
      registers[rd] = registers[rt] << parseInt(shamt, 0);
      break;
    }
    case "srl": {
      const [rd, rt, shamt] = operands;
      registers[rd] = registers[rt] >>> parseInt(shamt, 0);
      break;
    }
    case "jr": {
      const [rs] = operands;
      return registers[rs];
    }
    case "addi": {
      const [rt, rs, immediate] = operands;
      const src = registers[rs] | 0;
      const imm = parseInt(immediate, 0) | 0;
      const result = (src + imm) | 0;
      const overflow = (src > 0 && imm > 0 && result < 0) || (src < 0 && imm < 0 && result > 0);
      registers[rt] = result;
      registers._overflow = overflow;
      break;
    }
    case "addiu": {
      const [rt, rs, immediate] = operands;
      registers[rt] = (registers[rs] >>> 0) + (parseInt(immediate, 0) >>> 0);
      break;
    }
    case "andi": {
      const [rt, rs, immediate] = operands;
      registers[rt] = registers[rs] & parseInt(immediate, 0);
      break;
    }
    case "ori": {
      const [rt, rs, immediate] = operands;
      registers[rt] = registers[rs] | parseInt(immediate, 0);
      break;
    }
    case "slti": {
      const [rt, rs, immediate] = operands;
      registers[rt] = registers[rs] < parseInt(immediate, 0) ? 1 : 0;
      break;
    }
    case "sltiu": {
      const [rt, rs, immediate] = operands;
      registers[rt] = (registers[rs] >>> 0) < (parseInt(immediate, 0) >>> 0) ? 1 : 0;
      break;
    }
    case "lw": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset, 0);
      if (memory.hasOwnProperty(address)) {
        registers[rt] = memory[address];
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "sw": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset, 0);
      memory[address] = registers[rt];
      break;
    }
    case "lbu": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset, 0);
      if (memory.hasOwnProperty(address)) {
        registers[rt] = memory[address] & 0xFF;
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "lhu": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset, 0);
      if (memory.hasOwnProperty(address)) {
        registers[rt] = memory[address] & 0xFFFF;
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "ll": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset, 0);
      registers._linkedAddress = address;
      registers[rt] = memory[address];
      break;
    }
    case "sc": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset, 0);
      if (registers._linkedAddress === address) {
        memory[address] = registers[rt];
        registers[rt] = 1;
      } else {
        registers[rt] = 0;
      }
      break;
    }
    case "sb": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset, 0);
      memory[address] = registers[rt] & 0xFF;
      break;
    }
    case "sh": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset, 0);
      memory[address] = registers[rt] & 0xFFFF;
      break;
    }
    case "lui": {
      const [rt, immediate] = operands;
      registers[rt] = parseInt(immediate, 0) << 16;
      break;
    }
    case "beq": {
      const [rs, rt, offset] = operands;
      if (registers[rs] === registers[rt]) {
        return PC + parseInt(offset, 0);
      }
      break;
    }
    case "bne": {
      const [rs, rt, offset] = operands;
      if (registers[rs] !== registers[rt]) {
        return PC + parseInt(offset, 0);
      }
      break;
    }
    case "j": {
      const [address] = operands;
      return parseInt(address, 0);
    }
    case "jal": {
      const [address] = operands;
      registers["ra"] = PC + 1;
      return parseInt(address, 0);
    }
    default: {
      console.error("Unsupported operation:", op);
      break;
    }
  }
}  




export default MIPS;