import React, { useEffect, useState } from "react";
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

function getChangedKey(prevState, currState) {
  for (const key in currState) {
    if (currState[key] !== prevState[key]) {
      return {
        key: key,
        oldValue: prevState[key],
        newValue: currState[key]
      };
    }
  }

  return null; // No change detected
}

const MIPS = () => {
  //Visulaizer constants
  const [visualization, setVisualization] = useState({
    regA: null,
    regB: null,
    aluResult: null,
  });
  // Function to update the visualization state
  const updateVisualization = (regA=null, regB = null, aluResult = null) => {
    setVisualization({ regA, regB, aluResult });
  };
  const [mipsInput, setMipsInput] = useState("");
  const [hexInput, setHexInput] = useState("");
  const [registers, setRegisters] = useState(initialRegisters);
  const [memory, setMemory] = useState(initialMemory);
  const [PC, setPC] = useState(0);
  const [history, setHistory] = useState([]);
  const instructions = mipsInput.trim().split("\n");
  const currentInstruction = instructions[PC] || '';

  const [lastMemory, setLastMemory] = useState(initialMemory);
  const [memoryOut, setMemoryOut] = useState("0x0")
  useEffect(() => {
    const out = getChangedKey(lastMemory, memory);
    if (out)
      setMemoryOut('0x' + out.newValue.toString(16).toUpperCase())
  }, [memory])

  useEffect(()=> {
    // aqui iria el codigo para mostrar el valor en la interfaz
    console.log(memoryOut)

    const h1 = document.createElement('h1')
    //h1.style
    h1.style.position = "absolute"
    //h1.style.top = window.innerWidth / 2;
    //h1.style.left = 123;
  }, [memoryOut])

  const updateTables = (newRegisters, newMemory) => {
    setRegisters(newRegisters);
    setLastMemory(memory);
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
    let pc = 0;

    while (pc < hexInstructions.length) {
      const newPC = executeMIPSInstruction(hexInstructions[pc], newRegisters, newMemory, pc,updateVisualization);
      if (newPC !== undefined) {
        pc = newPC;
      } else {
        pc += 1;
      }
    }

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
    const newPC = executeMIPSInstruction(instructions[PC], newRegisters, newMemory, PC, updateVisualization);
  
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
      setLastMemory(memory);
      setMemory(lastState.memory);
      setHistory(history.slice(0, lastHistoryIndex));
    }
  };

  const resetMIPS = () => {
    setPC(0);
    setHistory([]);
    setRegisters(initialRegisters);
    setLastMemory(memory);
    setMemory(initialMemory);
  };

  return (
    <div>
      <Visualization {...visualization}/>
      <div className="row-container">
        <DropArea setMipsInput={setMipsInput} setHexInput={setHexInput} />
        <textarea
          id="mips-input"
          className="input-text-area"
          placeholder="Enter MIPS instructions here..."
          value={mipsInput}
          onChange={(e) => setMipsInput(e.target.value)}
        />
        <button
          id="simulate-mips-button"
          className="btnSimulate"
          onClick={simulateMIPS}
        >
          Simulate MIPS
        </button>
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
        <REGISTERtable registers={registers} />
      </div>
    </div>
  );
};

function executeMIPSInstruction(instruction, registers, memory, PC,updateVisualization) {
  // Split MIPS instruction into operation and operands
  const [op, ...operands] = instruction.split(" ");
  // Implement execution logic for each MIPS operation
  switch (op) {
    case "add": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] + registers[rt];
      updateVisualization(registers[rs], registers[rt], registers[rd]);
      break;
    }
    case "sub": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] - registers[rt];
        updateVisualization(registers[rs], registers[rt], registers[rd]);
      break;
    }
    case "slt": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] < registers[rt] ? 1 : 0;
        updateVisualization(registers[rs], registers[rt], registers[rd]);
      break;
    }
    case "and": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] & registers[rt];
        updateVisualization(registers[rs], registers[rt], registers[rd]);
      break;
    }
    case "or": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] | registers[rt];
        updateVisualization(registers[rs], registers[rt], registers[rd]);
      break;
    }
    case "addi": {
      const [rd, rs, immediate] = operands;
      registers[rd] = registers[rs] + parseInt(immediate);
      updateVisualization(registers[rs],null, registers[rd]);
      break;
    }
    case "lw": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset);
      if (memory.hasOwnProperty(address)) {
        registers[rt] = memory[address];
          updateVisualization(null,null,address);
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "sw": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset);
      memory[address] = registers[rt];
        updateVisualization(null, registers[rt], address);
      break;
    }
    case "j": {
      const [address] = operands;
      updateVisualization(null, null, null);
      return parseInt(address); 
    }
    case "beq": {
      const [rs, rt, offset] = operands;
        updateVisualization(registers[rs], registers[rt], null);
      if (registers[rs] === registers[rt]) {
        return PC + parseInt(offset);
      }
      break;
    }
    case "bne": {
      const [rs, rt, offset] = operands;
        updateVisualization(registers[rs], registers[rt], null);
      if (registers[rs] !== registers[rt]) {
        return PC + parseInt(offset); 
      }
      break;
    }
    default: {
      console.error("Unsupported operation:", op);
      break;
    }
  }
}



//componente para visualizar
const Visualization = (visualization) => (
  <div className="visualization">
    {visualization.regA !== null && <h1>Register A (rs): {visualization.regA}</h1>}
    {visualization.regB !== null && <h1>Register B (rt): {visualization.regB}</h1>}
    {visualization.aluResult !== null && <h1>ALU Result: {visualization.aluResult}</h1>}
  </div>
);

export default MIPS;