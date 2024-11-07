import React, { useState, useEffect } from 'react';
import Debugger from './Components/Debugger';
import DropArea from './Components/DropArea';
import SimulationTables from './Components/SimulationTables';

const initialRegisters = {
    zero: 0, at: 0, v0: 0, v1: 0,
    a0: 0, a1: 0, a2: 0, a3: 0,
    t0: 0, t1: 0, t2: 0, t3: 0,
    t4: 0, t5: 0, t6: 0, t7: 0,
    s0: 0, s1: 0, s2: 0, s3: 0,
    s4: 0, s5: 0, s6: 0, s7: 0,
    t8: 0, t9: 0, k0: 0, k1: 0,
    gp: 0, sp: 0, fp: 0, ra: 0
};

const initialMemory = Array.from({ length: 32 }).reduce((acc, curr, i) => ({ ...acc, [i]: 0 }), {});
const MIPSApp = () => {
    const [mipsInput, setMipsInput] = useState('');
    const [hexInput, setHexInput] = useState('');
    const [registers, setRegisters] = useState(initialRegisters);
    const [memory, setMemory] = useState(initialMemory);
    const [PC, setPC] = useState(0);
    const [history, setHistory] = useState([]);
    const [isHighlight, setIsHighlight] = useState(false);





    useEffect(() => {
        updateDebuggerInfo();
    }, [PC]);

    const simulateMIPS = () => {
        // Scroll to the simulation tables
        document.getElementById('simulation-tables').scrollIntoView({ behavior: 'smooth' });

        const hexInstructions = mipsInput.trim().split('\n');
        resetMIPS();

        hexInstructions.forEach(instruction => {
            executeMIPSInstruction(instruction, registers, memory);
        });

        updateTables(registers, memory);
    };

    const executeMIPSInstruction = (instruction, registers, memory) => {
        const [op, ...operands] = instruction.split(' ');
        switch (op) {
            // Implementar lógica de instrucciones MIPS aquí
            case 'add':
                const [rd, rs, rt] = operands;
                registers[rd] = registers[rs] + registers[rt];
                break;
            // Otros casos...
            default:
                console.error('Unsupported operation:', op);
                break;
        }
    };

    const resetMIPS = () => {
        setPC(0);
        setHistory([]);
        setRegisters(initialRegisters);
        setMemory(initialMemory);
    };

    const updateTables = (registers, memory) => {
        // Lógica para actualizar las tablas con los valores de registros y memoria
    };

    const updateDebuggerInfo = () => {
        // Lógica para actualizar la información del depurador
    };

    return (
        <div>
            <DropArea setMipsInput={setMipsInput} setHexInput={setHexInput} />
            <textarea id="mips-input" value={mipsInput} onChange={(e) => setMipsInput(e.target.value)} />
            <textarea id="hex-input" value={hexInput} onChange={(e) => setHexInput(e.target.value)} />
            <button id="simulate-mips-button" onClick={simulateMIPS}>Simulate MIPS</button>
            <SimulationTables registers={registers} memory={memory} />
            <Debugger PC={PC} mipsInput={mipsInput} />
        </div>
    );
};

export default MIPSApp;
