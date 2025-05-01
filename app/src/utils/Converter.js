export function binaryToHex(binaryString) {
    // Pad the binary string with leading zeros to ensure it's a multiple of 4
    while (binaryString.length % 4 !== 0) {
        binaryString = '0' + binaryString;
    }

    // Initialize an empty string to store the hexadecimal representation
    let hexString = '';

    // Convert each group of 4 bits to its hexadecimal equivalent
    for (let i = 0; i < binaryString.length; i += 4) {
        const binaryChunk = binaryString.substr(i, 4); // Get a chunk of 4 bits
        const hexDigit = parseInt(binaryChunk, 2).toString(16); // Convert the chunk to hexadecimal
        hexString += hexDigit; // Append the hexadecimal digit to the result
    }

    // Return the hexadecimal representation
    return "0x" + hexString.toUpperCase(); // Convert to uppercase for consistency
}

export function hexToBinary(hex) {
    let binary = '';
    for (let i = 0; i < hex.length; i++) {
        let bin = parseInt(hex[i], 16).toString(2);
        binary += bin.padStart(4, '0');
    }
    return binary;
}



// Supports all Core Instructions
export function translateInstructionToMIPS(hexInstruction) {
    console.log("hexInstruction", hexInstruction);
    const opcodeMap = {
        "000000": "add",
        "001000": "addi",
        "001001": "addiu",
        "000000": "addu",
        "000000": "and",
        "001100": "andi",
        "000100": "beq",
        "000101": "bne",
        "000010": "j",
        "000011": "jal",
        "000000": "jr",
        "100100": "lbu",
        "100101": "lhu",
        "110000": "ll",
        "001111": "lui",
        "100011": "lw",
        "000000": "nor",
        "000000": "or",
        "001101": "ori",
        "000000": "slt",
        "001010": "slti",
        "001011": "sltiu",
        "000000": "sltu",
        "000000": "sll",
        "000000": "srl",
        "101000": "sb",
        "111000": "sc",
        "101001": "sh",
        "101011": "sw",
        "000000": "sub",
        "000000": "subu",
    };

    const funcMap = {
        "100000": "add",
        "100001": "addu",
        "100100": "and",
        "001000": "jr",
        "100111": "nor",
        "100101": "or",
        "101010": "slt",
        "101011": "sltu",
        "000000": "sll",
        "000010": "srl",
        "100010": "sub",
        "100011": "subu",
    };

    const regMap = {
        "00000": "zero",
        "00001": "at",
        "00010": "v0",
        "00011": "v1",
        "00100": "a0",
        "00101": "a1",
        "00110": "a2",
        "00111": "a3",
        "01000": "t0",
        "01001": "t1",
        "01010": "t2",
        "01011": "t3",
        "01100": "t4",
        "01101": "t5",
        "01110": "t6",
        "01111": "t7",
        "10000": "s0",
        "10001": "s1",
        "10010": "s2",
        "10011": "s3",
        "10100": "s4",
        "10101": "s5",
        "10110": "s6",
        "10111": "s7",
        "11000": "t8",
        "11001": "t9",
        "11010": "k0",
        "11011": "k1",
        "11100": "gp",
        "11101": "sp",
        "11110": "fp",
        "11111": "ra"
    };
    
    const binaryInstruction = hexToBinary(hexInstruction);
    const opcode = binaryInstruction.slice(0, 6);
    console.log(opcode);
    const opcodeMIPS = opcodeMap[opcode];
    if (!opcodeMIPS) return "Unknown Instruction, opcode null";

    let mipsInstruction = opcodeMIPS + " ";

    // Check instruction type and operate on registers
    if (["add", "addu", "sub", "subu", "slt", "sltu", "and", "or", "nor"].includes(opcodeMIPS)) {
        // R-type instruction
        const func = binaryInstruction.slice(26, 32);;
        console.log("Instruction func ", func);
        const funcMIPS = funcMap[func];
        console.log("Instruction ", funcMIPS);
        if (!funcMIPS) return "Unknown Instruction (function)";
        mipsInstruction = funcMIPS + " ";
        const rs = regMap[binaryInstruction.slice(6, 11)];
        const rt = regMap[binaryInstruction.slice(11, 16)];
        const rd = regMap[binaryInstruction.slice(16, 21)];
        if (!rs || !rt || !rd) return "Invalid Registers";
        mipsInstruction += rd + " " + rs + " " + rt;
        
    } else if (["lw", "sw", "lbu", "lhu", "ll", "sb", "sh", "sc"].includes(opcodeMIPS)) {
        // I-type instruction: memory operation
        const rt = regMap[binaryInstruction.slice(6, 11)];
        const rs = regMap[binaryInstruction.slice(11, 16)];
        const offset = binaryInstruction.slice(16, 32);
        console.log('lw, sw offset ', binaryToHex(offset));
        if (!rt || !rs || isNaN(offset)) return "Invalid Syntax";
        mipsInstruction += rs + " " + rt + " " + binaryToHex(offset);

    } else if (["addi", "addiu", "lui", "andi", "ori", "slti", "sltiu"].includes(opcodeMIPS)) {
        // I-type instruction: arithmetic/logical immediate
        console.log("I-type instruction, addi");
        const rt = regMap[binaryInstruction.slice(6, 11)];
        const rs = regMap[binaryInstruction.slice(11, 16)];
        // const immediate = parseInt(binaryInstruction.slice(16, 32), 16);
        console.log('immediate ', binaryInstruction.slice(16, 32));
        console.log('immediate formated ', binaryToHex(binaryInstruction.slice(16, 32)));
        const immediate = binaryToHex(binaryInstruction.slice(16, 32));
        if (!rt || !rs || !immediate) return "Invalid Syntax";
        mipsInstruction += rs + " " + rt + " " + immediate;

    } else if (["beq", "bne"].includes(opcodeMIPS)) {
        // I-type instruction: branch instruction
        const rs = regMap[binaryInstruction.slice(6, 11)];
        const rt = regMap[binaryInstruction.slice(11, 16)];
        const offset = parseInt(binaryInstruction.slice(16, 32), 16);
        if (!rs || !rt || isNaN(offset)) return "Invalid Syntax";
        // For simplicity, assuming label is an immediate value (offset)
        mipsInstruction += rs + " " + rt + " " + offset;

    } else if (["j", "jal"].includes(opcodeMIPS)) {
        // J-type instruction
        const address = binaryToHex(binaryInstruction.slice(6, 32));
        if (isNaN(address)) return "Invalid Syntax";
        mipsInstruction += address;

    } else if (["sll", "srl"].includes(opcodeMIPS)) {
        // R-type instruction: shift
        const rd = regMap[binaryInstruction.slice(16, 21)];
        const rt = regMap[binaryInstruction.slice(11, 16)];
        const shamt = parseInt(binaryInstruction.slice(21, 26), 2);
        if (!rd || !rt || isNaN(shamt)) return "Invalid Syntax";
        mipsInstruction += rd + " " + rt + " " + shamt;

    } else if (["jr"].includes(opcodeMIPS)) {
        const rs = regMap[binaryinstruction.slice(6, 11)];
        if (!rs) return "Invalid Registers";
        mipsInstruction += rs;

    } else {
        return "Unsupported instruction opcode", opcodeMIPS;
    }

    return mipsInstruction;
}