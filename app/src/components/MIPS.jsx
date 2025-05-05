import React, { useState, useEffect } from "react";
import Debugger from "./Debugger";
import DropArea from "./Drop";
import "../styles/MIPS.css";
import RAMtable from "./RAMtable";
import REGISTERtable from "./REGISTERtable";
import CircuitImage from './Circuit';
import CodeEditor from "./CodeEditor";

// Initial state for registers and memory
// The registers are variables used to store data temporarily during the execution of a program.
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
    document
      .getElementById("simulation-tables")
      .scrollIntoView({ behavior: "smooth" });

    const hexInstructions = mipsInput.trim().split("\n");
    resetMIPS();

    const newRegisters = { ...initialRegisters };
    const newMemory = { ...initialMemory };

    let newHistory = [];
    let pc = 0;

    while (pc < hexInstructions.length) {
      const newPC = executeMIPSInstruction(hexInstructions[pc], newRegisters, newMemory, pc, newHistory, false);
      if (newPC !== undefined) {
        pc = newPC;
      } else {
        pc += 1;
      }
    }
    setPC(pc);
    setHistory(newHistory);
    updateTables(newRegisters, newMemory);
  };

  const stepMIPS = () => {
    const instructions = mipsInput.trim().split("\n");
    if (PC >= instructions.length) {
      setPC(0);
      updateTables(initialRegisters, initialMemory);
      setHistory([
        ...history,
        { PC, registers: { ...registers }, memory: { ...memory } },
      ]);
      return;
    }

    const newRegisters = { ...registers };
    const newMemory = { ...memory };
    const newPC = executeMIPSInstruction(instructions[PC], newRegisters, newMemory, PC, history);
  
    if (newPC !== undefined) {
      console.log(newPC);
      setPC(newPC);
    } else {
      setPC(PC + 1);
    }
  
    updateTables(newRegisters, newMemory);
    setHistory([
      ...history,
      { PC, registers: { ...registers }, memory: { ...memory } },
    ]);
  };

  const stepBackMIPS = () => {
    if (PC === 0){
      const lastHistoryIndex = history.length - 1;
      const lastState = history[lastHistoryIndex];
      if (lastState) {
        setPC(lastState.PC);
        setRegisters(lastState.registers);
        setMemory(lastState.memory);
        setHistory(history.slice(0, lastHistoryIndex));
      }
      return;
    }

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
      <CircuitImage currentInstruction={currentInstruction} registers={registers} />
      <div className="row-container">
        <DropArea setMipsInput={setMipsInput} setHexInput={setHexInput} />
        <CodeEditor
          value={mipsInput}
          onChange={(e) => setMipsInput(e.target.value)}
          placeholder="Enter MIPS instructions here..."
        />
        {/*<button
          id="simulate-mips-button"
          className="btnSimulate"
          onClick={simulateMIPS}
        >
          Simulate MIPS
        </button>*/}
        <Debugger
          PC={PC}
          simulateMIPS={simulateMIPS}
          mipsInput={mipsInput}
          stepMIPS={stepMIPS}
          stepBackMIPS={stepBackMIPS}
          resetMIPS={resetMIPS}
        />
      </div>
      
      <div className="bottom-section">
        <RAMtable memory={memory} />
        
        <REGISTERtable registers={registers} />

      </div>
      
    </div>
  );
};

function executeMIPSInstruction(instruction, registers, memory, PC, history, sw = 1) {
  // Split MIPS instruction into operation and operands
  const [op, ...operands] = instruction.split(" ");
  // Implement execution logic for each MIPS operation: in order
  switch (op) {
    case "add": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] + registers[rt];
      break;
    }
    case "addi": {
      const [rt, rs, immediate] = operands;
      const isNegative = (immediate & 0x8000) !== 0; // Verifica el bit 15 (signo)
      const signExtended = isNegative ? immediate | 0xFFFF0000 : immediate; // si el num es neg, rellena con 1 gracias al or(|), si no, el relleno con 0's es auto
      registers[rt] = registers[rs] + parseInt(signExtended);
      break;
    }
    case "addiu": {
      const [rt, rs, immediate] = operands;
      const isNegative = (immediate & 0x8000) !== 0; // Verifica el bit 15 (signo)
      const signExtended = isNegative ? immediate | 0xFFFF0000 : immediate; // si el num es neg, rellena con 1 gracias al or(|), si no, el relleno con 0's es auto
      registers[rt] = registers[rs] + parseInt(signExtended);
      break;
    }
    case "addu": {
      const [rt, rs, rd] = operands;
      registers[rd] = registers[rs] + registers[rt];
      break;
    }
    case "and": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] & registers[rt];
      break;
    }
    case "andi": {
      const [rt, rs, immediate] = operands;
      registers[rt] = registers[rs] & parseInt(immediate);
      break;
    }
    case "beq": {
      const [rs, rt, offset] = operands;
      if (registers[rs] === registers[rt]) {
        return PC + 1 + parseInt(offset);
      }
      break;
    }
    case "bne": {
      const [rs, rt, offset] = operands;
      if (registers[rs] !== registers[rt]) {
        return PC + 1 + parseInt(offset);
      }
      break;
    }
    case "j": {
      const [target] = operands;
      return parseInt(target);
    }
    case "jal": {
      const [target] = operands;
      registers["ra"] = PC + 2;
      return parseInt(target);
    }
    case "jr": {
      const [rs] = operands;
      return registers[rs];
    }
    case "lbu": {
      const [rs, rt, offset] = operands;
      const isNegative = (offset & 0x8000) !== 0; // Verifica el bit 15 (signo)
      const signExtendedOffset = isNegative ? offset | 0xFFFF0000 : offset; // si el num es neg, rellena con 1 gracias al or(|), si no, el relleno con 0's es auto
      const address = registers[rs] + parseInt(signExtendedOffset);
      if (memory.hasOwnProperty(address)) {
        registers[rt] = memory[address] & 0xFF;
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "lhu": {
      const [rs, rt, offset] = operands;
      const isNegative = (offset & 0x8000) !== 0; // Verifica el bit 15 (signo)
      const signExtendedOffset = isNegative ? offset | 0xFFFF0000 : offset; // si el num es neg, rellena con 1 gracias al or(|), si no, el relleno con 0's es auto
      const address = registers[rs] + parseInt(signExtendedOffset);
      if (memory.hasOwnProperty(address)) {
        registers[rt] = memory[address] & 0xFFFF;
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "ll": {
      const [rs, rt, offset] = operands;
      const isNegative = (offset & 0x8000) !== 0; // Verifica el bit 15 (signo)
      const signExtendedOffset = isNegative ? offset | 0xFFFF0000 : offset; // si el num es neg, rellena con 1 gracias al or(|), si no, el relleno con 0's es auto
      const address = registers[rs] + parseInt(signExtendedOffset);
      if (memory.hasOwnProperty(address)) {
        registers[rt] = memory[address];
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "lui": {
      const [rt, ,immediate] = operands;
      registers[rt] = immediate << 16;
      break;
    }
    case "lw": {
      const [rt, base, offset] = operands;
      const isNegative = (offset & 0x8000) !== 0; // Verifica el bit 15 (signo)
      const signExtendedOffset = isNegative ? offset | 0xFFFF0000 : offset; // si el num es neg, rellena con 1 gracias al or(|), si no, el relleno con 0's es auto
      const address = registers[base] + parseInt(signExtendedOffset);
      if (memory.hasOwnProperty(address)) {
        registers[rt] = memory[address];
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "nor": {
      const [rd, rs, rt] = operands;
      registers[rd] = ~(registers[rs] | registers[rt]);
      break;
    }
    case "or": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] | registers[rt];
      break;
    }
    case "ori": {
      const [rt, rs, immediate] = operands;
      registers[rt] = registers[rs] | parseInt(immediate);
      break;
    }
    case "slt": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] < registers[rt] ? 1 : 0;
      break;
    }
    case "slti": {
      const [rt, rs, immediate] = operands;
      registers[rt] = registers[rs] < parseInt(immediate) ? 1 : 0;
      break;
    }
    case "sltiu": {
      const [rt, rs, immediate] = operands;
      registers[rt] = (registers[rs] >>> 0) < (parseInt(immediate) >>> 0) ? 1 : 0;
      break;
    }
    case "sltu": {
      const [rd, rs, rt] = operands;
      registers[rd] = (registers[rs] >>> 0) < (registers[rt] >>> 0) ? 1 : 0;
      break;
    }
    case "sll": {
      const [rd, rt, shamt] = operands;
      registers[rd] = registers[rt] << parseInt(shamt);
      break;
    }
    case "srl": {
      const [rd, rt, shamt] = operands;
      registers[rd] = registers[rt] >>> parseInt(shamt);
      break;
    }
    case "sb": {
      const [rs, rt, offset] = operands;
      const address = registers[rs] + parseInt(offset);
      if (memory.hasOwnProperty(address)) {
        memory[address] = registers[rt] & 0xFF;
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "sc": {
      const [rt, rs, offset] = operands;
      const isNegative = (offset & 0x8000) !== 0; // Verifica el bit 15 (signo)
      const signExtendedOffset = isNegative ? offset | 0xFFFF0000 : offset; // si el num es neg, rellena con 1 gracias al or(|), si no, el relleno con 0's es auto
      const address = registers[rs] + parseInt(signExtendedOffset);
      if (memory.hasOwnProperty(address)) {
        memory[address] = registers[rt];
        registers[rt] = 1;
      } else {
        registers[rt] = 0;
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "sh": {
      const [rs, rt, offset] = operands;
      const address = registers[rs] + parseInt(offset);
      if (memory.hasOwnProperty(address)) {
        memory[address] = registers[rt] & 0xFFFF;
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "sw": {
      const [rt, base, offset] = operands;
      const address = registers[base] + parseInt(offset);
      if (memory.hasOwnProperty(address)) {
        memory[address] = registers[rt];
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "sub": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] - registers[rt];
      break;
    }
    case "subu": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] - registers[rt];
      break;
    }
    default: {
      console.error("Unsupported operation:", op);
      break;
    }
  }
  if (sw == 0){
  history.push({ PC, registers: { ...registers }, memory: { ...memory } });
  }
}

export default MIPS;
