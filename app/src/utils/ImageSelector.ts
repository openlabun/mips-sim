const value = {
  add: ["add/add1", "add/add2", "add/add3", "add/add4"],
  sub: ["add/add1", "add/add2", "add/add3", "add/add4"],
  slt: ["add/add1", "add/add2", "add/add3", "add/add4"],
  addi: ["addi/addi1", "addi/addi2", "addi/addi3", "addi/addi4"],
  and: ["add/add1", "add/add2", "add/add3", "add/add4"],
  or: ["add/add1", "add/add2", "add/add3", "add/add4"],
  lw: ["lw/lw1", "lw/lw2", "lw/lw3", "lw/lw4", "lw/lw5"],
  sw: ["sw/sw1", "sw/sw2", "sw/sw3", "sw/sw4"],
};

export const ImageSelector = (instruction: string): string[] => {
  return value[instruction.split(" ")[0]] as string[];
};
