const value = {
  add: ["add/add1", "add/add2", "add/add3", "add/add4"],
  sub: ["add/add1", "add/add2", "add/add3", "add/add4"],
  slt: ["add/add1", "add/add2", "add/add3", "add/add4"],
  addi: ["add/add1", "add/add2", "add/add3", "add/add4"],
  and: ["and/and1", "and/and2", "and/and3", "and/and4"],
  or: ["or/or1", "or/or2", "or/or3", "or/or4"],
  lw: ["lw/lw1", "lw/lw2", "lw/lw3", "lw/lw4", "lw/lw5"],
  sw: ["sw/sw1", "sw/sw2", "sw/sw3", "sw/sw4"],
};

export const ImageSelector = (instruction: string): string[] => {
  return value[instruction.split(" ")[0]] as string[];
};
