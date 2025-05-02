// ------------------------ UTILIDADES ------------------------

export function binaryToHex(binaryString) {
    while (binaryString.length % 4 !== 0) {
        binaryString = '0' + binaryString;
    }
    let hexString = '';
    for (let i = 0; i < binaryString.length; i += 4) {
        const binaryChunk = binaryString.substr(i, 4);
        const hexDigit = parseInt(binaryChunk, 2).toString(16);
        hexString += hexDigit;
    }
    return "0x" + hexString.toUpperCase();
}

export function hexToBinary(hex) {
    let binary = '';
    for (let i = 0; i < hex.length; i++) {
        let bin = parseInt(hex[i], 16).toString(2).padStart(4, '0');
        binary += bin;
    }
    return binary;
}

function toSigned(value, bits) {
    const max = 2 ** (bits - 1);
    return value >= max ? value - 2 ** bits : value;
}

// ------------------------ MAPAS ------------------------

const regMap = {
    "zero": "00000", "at": "00001", "v0": "00010", "v1": "00011",
    "a0": "00100", "a1": "00101", "a2": "00110", "a3": "00111",
    "t0": "01000", "t1": "01001", "t2": "01010", "t3": "01011",
    "t4": "01100", "t5": "01101", "t6": "01110", "t7": "01111",
    "s0": "10000", "s1": "10001", "s2": "10010", "s3": "10011",
    "s4": "10100", "s5": "10101", "s6": "10110", "s7": "10111",
    "t8": "11000", "t9": "11001", "k0": "11010", "k1": "11011",
    "gp": "11100", "sp": "11101", "fp": "11110", "ra": "11111"
};

const regMapReverse = Object.fromEntries(Object.entries(regMap).map(([k, v]) => [v, k]));

const instructionSet = {
    R: {
        "add":  { funct: "100000" },
        "addu": { funct: "100001" },
        "sub":  { funct: "100010" },
        "subu": { funct: "100011" },
        "and":  { funct: "100100" },
        "or":   { funct: "100101" },
        "slt":  { funct: "101010" },
        "sltu": { funct: "101011" },
        "jr":   { funct: "001000" },
        "nor":  { funct: "100111" },
        "sll":  { funct: "000000" },
        "srl":  { funct: "000010" }
    },
    I: {
        "addi":  { opcode: "001000" },
        "addiu": { opcode: "001001" },
        "slti":  { opcode: "001010" },
        "sltiu": { opcode: "001011" },
        "andi":  { opcode: "001100" },
        "ori":   { opcode: "001101" },
        "lw":    { opcode: "100011" },
        "sw":    { opcode: "101011" },
        "beq":   { opcode: "000100" },
        "bne":   { opcode: "000101" },
        "lbu":   { opcode: "100100" },
        "lhu":   { opcode: "100101" },
        "ll":    { opcode: "110000" },
        "lui":   { opcode: "001111" },
        "sb":    { opcode: "101000" },
        "sc":    { opcode: "111000" },
        "sh":    { opcode: "101001" }
    },
    J: {
        "j":    { opcode: "000010" },
        "jal":  { opcode: "000011" }
    }
};


// ------------------------ TRADUCCIÓN A HEX ------------------------

export function translateInstructionToHex(instruction) {
    const parts = instruction.replace(/,/g, '').split(/\s+/);
    const mnemonic = parts[0];

    if (instructionSet.R[mnemonic]) {
        const [_, rd, rs, rt] = parts;
        return binaryToHex(
            "000000" +
            regMap[rs] +
            regMap[rt] +
            regMap[rd] +
            "00000" +
            instructionSet.R[mnemonic].funct
        ).slice(2);
    } else if (instructionSet.I[mnemonic]) {
        const opcode = instructionSet.I[mnemonic].opcode;
        const [_, rt, rs, immStr] = parts;
        const imm = parseInt(immStr, 16); 
        const immBin = (imm >>> 0).toString(2).padStart(16, '0');
        return binaryToHex(opcode + regMap[rs] + regMap[rt] + immBin).slice(2);
    } else if (instructionSet.J[mnemonic]) {
        const address = parseInt(parts[1]);
        const addrBin = (address >>> 0).toString(2).padStart(26, '0');
        return binaryToHex(instructionSet.J[mnemonic].opcode + addrBin).slice(2);
    }

    return "Unsupported Instruction";
}



// ------------------------ TRADUCCIÓN A MIPS ------------------------

export function translateInstructionToMIPS(hexInstruction) {
    const bin = hexToBinary(hexInstruction.replace("0x", ""));
    const opcode = bin.slice(0, 6);

    if (opcode === "000000") {
        const rs = regMapReverse[bin.slice(6, 11)];
        const rt = regMapReverse[bin.slice(11, 16)];
        const rd = regMapReverse[bin.slice(16, 21)];
        const funct = bin.slice(26, 32);
        const mnemonic = Object.entries(instructionSet.R).find(([_, val]) => val.funct === funct)?.[0];
        if (!mnemonic) return "Unknown R-type instruction";
        return `${mnemonic} ${rd} ${rs} ${rt}`;
    }

    const iTypeMnemonic = Object.entries(instructionSet.I).find(([_, val]) => val.opcode === opcode)?.[0];
    if (iTypeMnemonic) {
        const rs = regMapReverse[bin.slice(6, 11)];
        const rt = regMapReverse[bin.slice(11, 16)];
        const imm = toSigned(parseInt(bin.slice(16, 32), 2), 16);

        return `${iTypeMnemonic} ${rt} ${rs} 0x${(imm & 0xFFFF).toString(16).padStart(4, '0')}`;
    }

    if (opcode === "000010" || opcode === "000011") {
        const mnemonic = opcode === "000010" ? "j" : "jal";
        const address = parseInt(bin.slice(6, 32), 2);
        return `${mnemonic} ${address}`;
    }

    return "Unknown instruction";
}
