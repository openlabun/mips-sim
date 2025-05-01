import React from 'react';
import '../styles/Circuit.css';
import defaultImage from '../images/MIPSCIRCUIT.png';
import addImage from '../images/ADD.png';
import subImage from '../images/SUB.png';
import andImage from '../images/AND.png';
import orImage from '../images/OR.png';
import addiImage from '../images/ADDI.png';
import lwImage from '../images/LW.png';
import swImage from '../images/SW.png';
import beqImage from '../images/BEQ.png';
import bneImage from '../images/BNE.png';
import jumpImage from '../images/JUMP.png';

const instructionImages = {
  add: addImage,
  sub: subImage,
  and: andImage,
  or: orImage,
  addi: addiImage,
  lw: lwImage,
  sw: swImage,
  beq: beqImage,
  bne: bneImage,
  j: jumpImage,
};

function decomposeInstruction(opCode, operands) {
  let rs, rt, rd, immediate, offset;
  if (['add', 'sub', 'or', 'and'].includes(opCode)) {
    [rd, rs, rt] = operands;
  }

  if (opCode === "addi") {
    [rd, rs, immediate] = operands;
  }

  if (['lw', 'sw'].includes(opCode)) {
    [rt, rs, offset] = operands;
    rd = opCode === 'lw' ? rt : rd; // lw uses rt as rd (Writes ro Register)
  }

  if (['beq', 'bne'].includes(opCode)) {
    [rs, rt, offset] = operands;
  }

  return [rs, rt, rd, immediate, offset];
}

function aluResultCalc(rs, rt, immediate, offset, opCode) {
  // Asegurar que todos sean números
  rs = parseInt(rs);
  rt = parseInt(rt);
  immediate = parseInt(immediate);
  offset = parseInt(offset);

  let result = 0;

  switch (opCode) {
    case "and":
      result = rs & rt;
      break;

    case "or":
      result = rs | rt;
      break;

    case "add":
      result = rs + rt;
      break;

    case "addi":
      result = rs + immediate;
      break;

    case "sub":
    case "beq":
    case "bne":
      result = rs - rt;
      break;

    case "lw":
    case "sw":
      result = rs + offset;
      break;
  }

  return `0x${(result & 0xFFFF).toString(16).padStart(4, "0").toUpperCase()}`; // return result as the ouput string (forced to be length 4)
}

//used to check if the beq/bne condition is met and set its content
function checkBranchCondition(opName, aluResult) { 
  const isBeqSuccess = opName === 'beq' && parseInt(aluResult, 16) === 0;
  const isBneSuccess = opName === 'bne' && parseInt(aluResult, 16) !== 0;

  const success = isBeqSuccess || isBneSuccess;
  const content = success
    ? `${opName.toUpperCase()} ✅`
    : `${opName.toUpperCase()} ❌`;

  return [success, content];
}

const CircuitImage = ({ currentInstruction, registers, memory }) => {
  const [opName, ...operands] = currentInstruction.trim().split(' ');
  const [rs, rt, rd, immediate, offset] = decomposeInstruction(opName, operands);

  const regAName = rs?.replace('$', '');
  const regBName = rt?.replace('$', '');
  const regAValue = registers[regAName] ?? 0;
  const regBValue = registers[regBName] ?? 0;

  const aluResult = aluResultCalc(regAValue, regBValue, immediate, offset, opName);
  const [branchConditionSuccess, branchConditionContent] = checkBranchCondition(opName, aluResult);

  const imageSrc = instructionImages[opName] || defaultImage;
  /*
  Notes: 
    1) "is Used in the instruction" means that the instruction actually uses the register as i/o.
    2) if the register/output is used in the instruction, then its box is highlighted.with a different color.
    
  boolean values to determine if the register/output is used in the instruction
  regAused: if the instruction uses the first register (rs) as input
  regBused: if the instruction uses the second register (rt) as input
  regWRused: if the instruction writes to a register (rd)
  aluDataWR_LwSw: if the instruction uses ALU data as the data written in rw, or as a mem addr in load/store
  aluBranch: if the instruction is a branch instruction (beq, bne) (Highlighted in yellow since ALU Output is only used to compare)
  memDataWR: if the instruction writes to register from mem (lw)
  */
  const regAused = ['add', 'sub', 'and', 'or', 'addi', 'beq', 'bne', 'lw', 'sw'].includes(opName);
  const regBused = ['add', 'sub', 'and', 'or', 'beq', 'bne', 'sw'].includes(opName);
  const regWRused = ['add', 'sub', 'and', 'or', 'addi', 'lw'].includes(opName);
  const aluDataWR_LwSw = ['add', 'sub', 'and', 'or', 'addi', 'lw', 'sw'].includes(opName);
  const aluBranch = ['beq', 'bne'].includes(opName);
  const memDataWR = opName === 'lw';

  return (
    <div className="circuit-container">
      <div className="image-wrapper">
        <img src={imageSrc} alt={`Circuito para ${opName}`} />

        {['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'].map((reg) => (
          <div key={reg} className={`register-value ${reg}`}>
            {`0x${registers[reg].toString(16).toUpperCase()}`}
          </div>
        ))}

        <div className="label-outputs regA">RegA</div>
        <div className="label-outputs regB">RegB</div>
        <div className="label-outputs memRead">Mem Read</div>
        <div className="label-outputs ALU">ALU</div>
        <div className="label-outputs regWrite">RW</div>

        <div className={`label-outputs-value regA ${regAused ? 'use' : 'noUse'}`}>
          {`0x${regAValue.toString(16).padStart(4, "0").toUpperCase()}`}
        </div>

        <div className={`label-outputs-value regB ${regBused ? 'use' : 'noUse'}`}>
          {`0x${regBValue.toString(16).padStart(4, "0").toUpperCase()}`}
        </div>

        <div className={`label-outputs-value ALU ${aluDataWR_LwSw ? 'use' : aluBranch ? 'branch' : 'noUse'}`}>
          {`${aluResult}`}
        </div>

        {/* Shows if BEQ or BNE condition is met */}
        {aluBranch && (
          <div className={`branch-condition ${branchConditionSuccess ? 'success' : 'failure'}`}>
            {`${branchConditionContent}`}
          </div>
        )}

        <div className={`label-outputs-value regWrite ${regWRused ? 'use' : 'noUse'}`}>
          {`${rd ?? "N/A"}`}
        </div>

        <div className={`label-outputs-value memRead ${memDataWR ? 'use' : 'noUse'}`}> 
          {`${memDataWR ? `0x${(memory[parseInt(aluResult, 16)] ?? 0).toString(16).padStart(4, "0").toUpperCase()}` : 'N/A'}`}
        </div>
        
      </div>
    </div>
  );
};

export default CircuitImage;