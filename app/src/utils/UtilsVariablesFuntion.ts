import { translateInstructionToHex } from './TranslatorFunctions';
import { hexToBinary } from './UtilityFunctions';
import { executeMIPSInstruction } from '../MipsApps/MipsApps';
import { getAluResult } from './ALUResultStore';

export interface InstructionVariables {
  PCwrite: number;
  PcWriteCond: number;
  lorD: number;
  MemRead: number;
  MemWrite: number;
  IRWrite: number;
  MemToReg: number;
  PCsource: number;
  TargetWrite: number;
  ALUOp: string;
  ALUSelB: string;
  ALUSelA: string;
  RegWrite: number;
  RegDst: number;
  ALUControl: string;
  OPCode: string;
  ALUResult: number;
  IntructionRegister: string;
}

export function assignInstructionVariables(instruction: string): InstructionVariables {
  const instructionMap = {
    add: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: "00",
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "10",
      ALUSelB: "00",
      ALUSelA: "01",
      RegWrite: 1,
      RegDst: "01",
      ALUControl: "0010",
      OPCode: "000000",
      ALUResult: 0,
      IntructionRegister: ""
    },
    sub: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: "00",
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "10",
      ALUSelB: "00",
      ALUSelA: "01",
      RegWrite: 1,
      RegDst: "01",
      ALUControl: "0110",
      OPCode: "000000",
      ALUResult: 0,
      IntructionRegister: ""
    },
    slt: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: "00",
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "10",
      ALUSelB: "00",
      ALUSelA: "01",
      RegWrite: 1,
      RegDst: "01",
      ALUControl: "0111",
      OPCode: "000000",
      ALUResult: 0,
      IntructionRegister: ""
    },
    and: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: "00",
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "10",
      ALUSelB: "00",
      ALUSelA: "01",
      RegWrite: 1,
      RegDst: "01",
      ALUControl: "0000",
      OPCode: "000000",
      ALUResult: 0,
      IntructionRegister: ""
    },
    or: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: "00",
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "10",
      ALUSelB: "00",
      ALUSelA: "01",
      RegWrite: 1,
      RegDst: "01",
      ALUControl: "0001",
      OPCode: "000000",
      ALUResult: 0,
      IntructionRegister: ""
    },
    addi: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: "00",
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "00",
      ALUSelB: "00",
      ALUSelA: "01",
      RegWrite: 1,
      RegDst: "01",
      ALUControl: "0010",
      OPCode: "001000",
      ALUResult: 0,
      IntructionRegister: ""
    },
    lw: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: "01",
      MemRead: 1,
      MemWrite: 0,
      IRWrite: 1,
      MemToReg: 1,
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "00",
      ALUSelB: "10",
      ALUSelA: 0,
      RegWrite: 1,
      RegDst: 0,
      Pcsource: 0,
      ALUControl: "0010",
      OPCode: "100011",
      ALUResult: 0,
      IntructionRegister: ""
    },
    sw: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 1,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: 0,
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "00",
      ALUSelB: "10",
      ALUSelA: "01",
      RegWrite: 0,
      RegDst: 0,
      ALUControl: "0010",
      OPCode: "101011",
      ALUResult: 0,
      IntructionRegister: ""
    },
    beq: {
      PCwrite: 0,
      PcWriteCond: 1,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: 0,
      PCsource: 1,
      TargetWrite: 0,
      ALUOp: "01",
      ALUSelB: "00",
      ALUSelA: 1,
      RegWrite: 0,
      RegDst: 0,
      ALUControl: "0110",
      OPCode: "000100",
      ALUResult: 0,
      IntructionRegister: ""
    },
    bne: {
      PCwrite: 0,
      PcWriteCond: 1,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: 0,
      PCsource: "01",
      TargetWrite: 0,
      ALUOp: "01",
      ALUSelB: "00",
      ALUSelA: "01",
      RegWrite: 0,
      RegDst: 0,
      ALUControl: "0110",
      OPCode: "000101",
      ALUResult: 0,
      IntructionRegister: ""
    },
    j: {
      PCwrite: 1,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: 0,
      PCsource: "10",
      TargetWrite: 0,
      ALUOp: "00",
      ALUSelB: "00",
      ALUSelA: 0,
      RegWrite: 0,
      RegDst: 0,
      ALUControl: "0000",
      OPCode: "000010",
      ALUResult: 0,
      IntructionRegister: ""
    },
    else: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: 0,
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "00",
      ALUSelB: "00",
      ALUSelA: "00",
      RegWrite: 0,
      RegDst: 0,
      ALUControl: "0000",
      OPCode: "000000",
      ALUResult: 0,
      IntructionRegister: ""
    }
  };


  const instructionParts = instruction.split(" ");
  const instructionType = instructionParts[0];

  if (instructionMap[instructionType]) {
    const variables = instructionMap[instructionType];
    const hexInstruction = translateInstructionToHex(instruction);
    const binaryInstruction = hexToBinary(hexInstruction);
    variables.IntructionRegister = binaryInstruction.padStart(32, '0');

    const aluResult = getAluResult();
    variables.ALUResult = aluResult;

    return variables;
  } else {
    return instructionMap.else;
  }
}