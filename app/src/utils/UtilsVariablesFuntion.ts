import { translateInstructionToHex } from './TranslatorFunctions';
import { hexToBinary } from './UtilityFunctions';

interface InstructionVariables {
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
  ALUSelA: number;
  RegWrite: number;
  RegDst: number;
  Pcsource: number;
  ALUControl: string;
  ALUResult: number;
  OPCode: string;
  RegWriteData: number;
  MemReadData: number;
  MemWriteData: number;
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
      MemToReg: 0,
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "10",
      ALUSelB: "00",
      ALUSelA: 1,
      RegWrite: 1,
      RegDst: 1,
      Pcsource: 0,
      ALUControl: "0010",
      ALUResult: 0,
      OPCode: "000000",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
      IntructionRegister: ""
    },
    sub: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: 0,
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "10",
      ALUSelB: "00",
      ALUSelA: 1,
      RegWrite: 1,
      RegDst: 1,
      Pcsource: 0,
      ALUControl: "0110",
      ALUResult: 0,
      OPCode: "000000",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
      IntructionRegister: ""
    },
    slt: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: 0,
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "10",
      ALUSelB: "00",
      ALUSelA: 1,
      RegWrite: 1,
      RegDst: 1,
      Pcsource: 0,
      ALUControl: "0111",
      ALUResult: 0,
      OPCode: "000000",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
      IntructionRegister: ""
    },
    and: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: 0,
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "10",
      ALUSelB: "00",
      ALUSelA: 1,
      RegWrite: 1,
      RegDst: 1,
      Pcsource: 0,
      ALUControl: "0000",
      ALUResult: 0,
      OPCode: "000000",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
      IntructionRegister: ""
    },
    or: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 0,
      MemRead: 0,
      MemWrite: 0,
      IRWrite: 0,
      MemToReg: 0,
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "10",
      ALUSelB: "00",
      ALUSelA: 1,
      RegWrite: 1,
      RegDst: 1,
      Pcsource: 0,
      ALUControl: "0001",
      ALUResult: 0,
      OPCode: "000000",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
      IntructionRegister: ""
    },
    addi: {
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
      ALUSelB: "10",
      ALUSelA: 1,
      RegWrite: 1,
      RegDst: 0,
      Pcsource: 0,
      ALUControl: "0010",
      ALUResult: 0,
      OPCode: "001000",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
      IntructionRegister: ""
    },
    lw: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 1,
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
      ALUResult: 0,
      OPCode: "100011",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
      IntructionRegister: ""
    },
    sw: {
      PCwrite: 0,
      PcWriteCond: 0,
      lorD: 1,
      MemRead: 0,
      MemWrite: 1,
      IRWrite: 0,
      MemToReg: 0,
      PCsource: 0,
      TargetWrite: 0,
      ALUOp: "00",
      ALUSelB: "10",
      ALUSelA: 0,
      RegWrite: 0,
      RegDst: 0,
      Pcsource: 0,
      ALUControl: "0010",
      ALUResult: 0,
      OPCode: "101011",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
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
      Pcsource: 1,
      ALUControl: "0110",
      ALUResult: 0,
      OPCode: "000100",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
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
      PCsource: 1,
      TargetWrite: 0,
      ALUOp: "01",
      ALUSelB: "00",
      ALUSelA: 1,
      RegWrite: 0,
      RegDst: 0,
      Pcsource: 1,
      ALUControl: "0110",
      ALUResult: 0,
      OPCode: "000101",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
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
      PCsource: 2,
      TargetWrite: 0,
      ALUOp: "00",
      ALUSelB: "00",
      ALUSelA: 0,
      RegWrite: 0,
      RegDst: 0,
      Pcsource: 2,
      ALUControl: "0000",
      ALUResult: 0,
      OPCode: "000010",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
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
      ALUSelA: 0,
      RegWrite: 0,
      RegDst: 0,
      Pcsource: 0,
      ALUControl: "0000",
      ALUResult: 0,
      OPCode: "000000",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
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
    return variables;
  } else {
    return instructionMap.else;
  }
}