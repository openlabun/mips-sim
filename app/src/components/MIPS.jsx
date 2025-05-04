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
  t4: 0, t5: 0, t6: 0, t7: 0, t8: 0, t9: 0,
  s0: 0, s1: 0, s2: 0, s3: 0,
  s4: 0, s5: 0, s6: 0, s7: 0,
  k0: 0, k1: 0,
  gp: 0, sp: 0, fp: 0, ra: 0,
  lo: 0,
  hi: 0,
  fcc: 0,
  f0: 0.0, f1: 0.0, f2: 0.0, f3: 0.0, f4: 0.0, f5: 0.0, f6: 0.0, f7: 0.0,
  f8: 0.0, f9: 0.0, f10: 0.0, f11: 0.0, f12: 0.0, f13: 0.0, f14: 0.0, f15: 0.0,
  f16: 0.0, f17: 0.0, f18: 0.0, f19: 0.0, f20: 0.0, f21: 0.0, f22: 0.0, f23: 0.0,
  f24: 0.0, f25: 0.0, f26: 0.0, f27: 0.0, f28: 0.0, f29: 0.0, f30: 0.0, f31: 0.0
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
    let pc = 0;

    while (pc < hexInstructions.length) {
      const newPC = executeMIPSInstruction(hexInstructions[pc], newRegisters, newMemory, pc);
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
        <button
          id="simulate-mips-button"
          className="btnSimulate"
          onClick={simulateMIPS}
        >
          Simulate MIPS
        </button>
      </div>
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
      <CircuitImage currentInstruction={currentInstruction} registers={registers} />
      </div>
    </div>
  );
};

function float64ToHex(val) {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, val, false); // big endian
  return (
    "0x" +
    [...Array(8)]
      .map((_, i) =>
        view.getUint8(i).toString(16).padStart(2, "0")
      )
      .join("")
  );
}

function executeMIPSInstruction(instruction, registers, memory, PC) {
  // Split MIPS instruction into operation and operands
  const [op, ...operands] = instruction.split(" ");
  // Implement execution logic for each MIPS operation
  console.log("Executing instruction:", instruction);
  console.log("PC:", PC);
  console.log("operands:", operands);
  switch (op) {
    case "add": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] + registers[rt];
      break;
    }
    case "sub": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] - registers[rt];
      break;
    }
    case "slt": {
      const [rd, rs, rt] = operands;
      registers[rd] = registers[rs] < registers[rt] ? 1 : 0;
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
    case "addi": {
      const [rd, rs, immediate] = operands;
      registers[rd] = registers[rs] + parseInt(immediate);
      break;
    }
    case "lw": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset);
      if (memory.hasOwnProperty(address)) {
        registers[rt] = memory[address];
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "sw": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset);
      memory[address] = registers[rt];
      break;
    }
    case "j": {
      const [address] = operands;
      return parseInt(address); 
    }
    case "beq": {
      const [rs, rt, offset] = operands;
      if (registers[rs] === registers[rt]) {
        return PC + parseInt(offset);
      }
      break;
    }
    case "bne": {
      const [rs, rt, offset] = operands;
      if (registers[rs] !== registers[rt]) {
        return PC + parseInt(offset); 
      }
      break;
    }
    case "addiu": {
      const [rt, rs, immediate] = operands;
      registers[rt] = registers[rs] + parseInt(immediate);
      break;
    }
    case "jal": {
      const [address] = operands;
      registers["ra"] = PC + 1;
      return parseInt(address);
    }
    case "ll": {
      const [rt, rs, offset] = operands;
      const address = registers[rs] + parseInt(offset);
      if (memory.hasOwnProperty(address)) {
        registers[rt] = memory[address];
      } else {
        console.error("Memory address not found:", address);
      }
      break;
    }
    case "slti": {
      const [rd, rs, immediate] = operands;
      registers[rd] = registers[rs] < parseInt(immediate) ? 1 : 0;
      break;
    }
    case "subu": {
      const [rd, rs, rt] = operands;
      registers[rd] = (registers[rs] - registers[rt]) >>> 0; // sin overflow
      break;
    }
    case "divu": {
      const [rs, rt] = operands;
      if (registers[rt] === 0) {
        console.error("Division by zero");
        break;
      }
      registers["lo"] = Math.floor(registers[rs] / registers[rt]) >>> 0;
      registers["hi"] = (registers[rs] % registers[rt]) >>> 0;
      break;
    } 
    case "mult": {
      registers["lo"] = 0;
      registers["hi"] = 0;
      const [rs, rt] = operands;
      const result = BigInt(registers[rs]) * BigInt(registers[rt]);
      console.log("Result of multiplication:", result);
      registers["lo"] = Number(result & BigInt(0xFFFFFFFF));
      registers["hi"] = Number((result >> BigInt(32)) & BigInt(0xFFFFFFFF));
      break;
    }
    case "ble": {
      const [rs, rt, offset] = operands;
      if (registers[rs] <= registers[rt]) {
        return parseInt(offset);
      }
      break;
    }
    case "srl": {
      const [rd, rt, sa] = operands;
      const shiftAmount = parseInt(sa);
      registers[rd] = (registers[rt] >>> shiftAmount) & 0xFFFFFFFF;
      break;
    }
    case "sdc1": {
      const [ft, base, offset] = operands;
      const address = registers[base] + parseInt(offset);
    
      // Convertir el valor de fVal a BigInt, ya que estamos trabajando con valores de 64 bits
      const fVal = BigInt(registers[ft]);
    
      // Guardar las dos partes del valor de 64 bits en memoria
      memory[address] = Number((fVal & 0xFFFFFFFFn));                // parte baja
      memory[address + 1] = Number((fVal >> 32n) & 0xFFFFFFFFn);     // parte alta
    
      break;
    }

    case "ldc1": {
      const [ft, base, offset] = operands;
      const address = registers[base] + parseInt(offset);
      const low = memory[address] ?? 0;
      const high = memory[address + 1] ?? 0;
      registers[ft] = (BigInt(high) << 32n) | BigInt(low);
      break;
    }

    case "mul.d": {
      const [fd, fs, ft] = operands;
    
      const left = parseFloat(registers[fs]); // asume que f2 = 3.0
      const right = parseFloat(registers[ft]); // asume que f2 = 3.0
    
      const result = left * right; // 9.0
    
      registers[fd] = result; // f4 = 9.0
    
      console.log(`${fd} = ${result}, HEX: ${float64ToHex(result)}`);
      break;
    } //DEPURAR ESTA INSTRUCCION, esta fallando 

    
    

    case "c.eq.d":
    case "c.lt.d":
    case "c.le.d": {
      const [fs, ft] = operands;
      const valFs = Number(registers[fs]);
      const valFt = Number(registers[ft]);
      let conditionMet = false;

      if (op === "c.eq.d") conditionMet = valFs === valFt;
      if (op === "c.lt.d") conditionMet = valFs < valFt;
      if (op === "c.le.d") conditionMet = valFs <= valFt;

      registers["fcc"] = conditionMet ? 1 : 0; // o usar un flag separado si lo manejas
      break;
    }
    default: {
      console.error("Unsupported operation:", op);
      break;
    }
  }
}

export default MIPS;
