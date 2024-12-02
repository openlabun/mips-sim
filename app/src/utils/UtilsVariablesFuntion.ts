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
  IntructionRegisterValue: number;
}

export function assignInstructionVariables(
  instruction: string
): InstructionVariables {
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
      IntructionRegisterValue: parseInt(instruction, 2) || 0,
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
      OPCode: "000001",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
      IntructionRegisterValue: parseInt(instruction, 2) || 0,
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
      OPCode: "000010",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
      IntructionRegisterValue: parseInt(instruction, 2) || 0,
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
      OPCode: "000011",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
      IntructionRegisterValue: parseInt(instruction, 2) || 0,
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
      OPCode: "000100",
      RegWriteData: 0,
      MemReadData: 0,
      MemWriteData: 0,
      IntructionRegisterValue: parseInt(instruction, 2) || 0,
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
      IntructionRegisterValue: 0,
    },
  };

  const instructionParts = instruction.split(" ");
  const instructionType = instructionParts[0];

  if (instructionMap[instructionType]) {
    return instructionMap[instructionType];
  } else {
    return instructionMap.else;
  }
}
