const value = {
  add: ["add/add1.png", "add/add2.png", "add/add3.png", "add/add4.png"],
  sub: ["add/add1.png", "add/add2.png", "add/add3.png", "add/add4.png"],
  slt: ["add/add1.png", "add/add2.png", "add/add3.png", "add/add4.png"],
  addi: [
    "addi/addi1.png",
    "addi/addi2.png",
    "addi/addi3.png",
    "addi/addi4.png",
  ],
  and: ["add/add1.png", "add/add2.png", "add/add3.png", "add/add4.png"],
  or: ["add/add1.png", "add/add2.png", "add/add3.png", "add/add4.png"],
  lw: ["lw/lw1.png", "lw/lw2.png", "lw/lw3.png", "lw/lw4.png", "lw/lw5.png"],
  sw: ["sw/sw1.png", "sw/sw2.png", "sw/sw3.png", "sw/sw4.png"],
  bne: ["bne/bne3.png"], // bne and beq have the same image and only the last one is used
  beq: ["bne/bne3.png"],
  else: ["Base.png"],
};

export const ImageSelector = (instruction: string): string[] => {
  const key = instruction.split(" ")[0];

  return value[key] || value["else"];
};
