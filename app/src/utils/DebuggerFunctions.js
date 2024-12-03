export function executeMIPSInstruction(instruction, registers, memory) {
    // Split MIPS instruction into operation and operands
    const [op, ...operands] = instruction.split(' ');

    // Implement execution logic for each MIPS operation
    switch (op) {
        case 'add': {
            const [rd, rs, rt] = operands;
            registers[rd] = registers[rs] + registers[rt];
            break;
        }
        case 'sub': {
            const [rd, rs, rt] = operands;
            registers[rd] = registers[rs] - registers[rt];
            break;
        }
        case 'slt': {
            const [rd, rs, rt] = operands;
            registers[rd] = registers[rs] < registers[rt] ? 1 : 0;
            break;
        }
        case 'and': {
            const [rd, rs, rt] = operands;
            registers[rd] = registers[rs] & registers[rt];
            break;
        }
        case 'or': {
            const [rd, rs, rt] = operands;
            registers[rd] = registers[rs] | registers[rt];
            break;
        }
        case 'addi': {
            const [rd, rs, immediate] = operands;
            registers[rd] = registers[rs] + parseInt(immediate);
            break;
        }
        case 'lw': {
            const [rt, rs, offset] = operands;
            const address = registers[rs] + parseInt(offset);
            //console.log('lw address:', address);
            //console.log('lw memory value:', memory[address]);
            if (memory.hasOwnProperty(address)) {
                registers[rt] = memory[address];
            } else {
                console.error('Memory address not found:', address);
            }
            break;
        }
        case 'sw': {
            const [rt, rs, offset] = operands;
            const address = registers[rs] + parseInt(offset);
            //console.log('sw rt:', rt, 'rs', rs, 'offset', offset, 'address', address,'getting', registers[rt] );
            memory[address] = registers[rt];
            break;
        }
        
        // Add cases for other MIPS operations
        default: {
            console.error('Unsupported operation:', op);
            break;
        }
    }

}