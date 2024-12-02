export function executeMIPSInstruction(instruction, registers, memory, PC) {
    // Split MIPS instruction into operation and operands
    const [op, ...operands] = instruction.split(' ');
    let aluResult = 0; 
    let newPC = PC + 1;

    // Implement execution logic for each MIPS operation
    switch (op) {
        case 'add': {
            const [rd, rs, rt] = operands;
            aluResult = registers[rs] + registers[rt];
            registers[rd] = aluResult;
            break;
        }
        case 'sub': {
            const [rd, rs, rt] = operands;
            aluResult = registers[rs] - registers[rt];
            registers[rd] = aluResult;
            break;
        }
        case 'slt': {
            const [rd, rs, rt] = operands;
            aluResult = registers[rs] < registers[rt] ? 1 : 0;
            registers[rd] = aluResult;
            break;
        }
        case 'and': {
            const [rd, rs, rt] = operands;
            aluResult = registers[rs] & registers[rt];
            registers[rd] = aluResult
            break;
        }
        case 'or': {
            const [rd, rs, rt] = operands;
            aluResult = registers[rs] | registers[rt];
            registers[rd] = aluResult
            break;
        }
        case 'addi': {
            const [rd, rs, immediate] = operands;
            aluResult = registers[rs] + parseInt(immediate);
            registers[rd] = aluResult
            break;
        }
        case 'lw': {
            const [rt, rs, offset] = operands;
            const address = registers[rs] + parseInt(offset);
            //console.log('lw address:', address);
            //console.log('lw memory value:', memory[address]);
            if (memory.hasOwnProperty(address)) {
                aluResult = memory[address];
                registers[rt] = aluResult
            } else {
                console.error('Memory address not found:', address);
            }
            break;
        }
        case 'sw': {
            const [rt, rs, offset] = operands;
            const address = registers[rs] + parseInt(offset);
            //console.log('sw rt:', rt, 'rs', rs, 'offset', offset, 'address', address,'getting', registers[rt] );
            aluResult = registers[rt];
            memory[address] = aluResult
            break;
        }
        case 'beq': {
            const [rs, rt, offset] = operands;
            aluResult = registers[rs] - registers[rt];
            if (registers[rs] === registers[rt]) {
                newPC = PC + parseInt(offset);
            }
            break;
        }
        case 'bne': {
            const [rs, rt, offset] = operands;
            aluResult = registers[rs] - registers[rt];
            if (registers[rs] !== registers[rt]) {
                newPC = PC + parseInt(offset);
            }
            break;
        }
        case 'j': {
            const [address] = operands;
            newPC = parseInt(address);
            break;
        }
        // Add cases for other MIPS operations
        default: {
            console.error('Unsupported operation:', op);
            break;
        }
    }

    return { aluResult, newPC }; // Return the ALU result and the new PC
}