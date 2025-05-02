import React from 'react';
import '../styles/Circuit.css';
import defaultImage from '../images/MIPSCIRCUIT.png';
import addImage from '../images/ADD.png';
import addiImage from '../images/ADDI.png';
import lwImage from '../images/LW.png';
import swImage from '../images/SW.png';
import beqImage from '../images/BEQ.png';
import bneImage from '../images/BNE.png';
import jumpImage from '../images/JUMP.png';
import addiuImage from '../images/ADDIU.png';
import adduImage from '../images/ADDU.png';
import andImage from '../images/AND.png';
import andiImage from '../images/ANDI.png';
import jalImage from '../images/JAL.png';
import orImage from '../images/OR.png';
import oriImage from '../images/ORI.png';
import sltImage from '../images/SLT.png';
import sltiImage from '../images/SLTI.png';
import sltiuImage from '../images/SLTIU.png';
import sltuImage from '../images/SLTU.png';
import subImage from '../images/SUB.png';
import subuImage from '../images/SUBU.png';
import jrImage from '../images/JR.png';
import lbuImage from '../images/LBU.png';
import lhuImage from '../images/LHU.png';
import llImage from '../images/LL.png';
import luiImage from '../images/LUI.png';
import norImage from '../images/NOR.png';
import sllImage from '../images/SLL.png';
import srlImage from '../images/SRL.png';
import sbImage from '../images/SB.png';
import scImage from '../images/SC.png';
import shImage from '../images/SH.png';

const instructionImages = {
  add: addImage,
  addi: addiImage,
  lw: lwImage,
  sw: swImage,
  beq: beqImage,
  bne: bneImage,
  j: jumpImage,
  addiu: addiuImage,
  addu: adduImage,
  and: andImage,
  andi: andiImage,
  jal: jalImage,
  or: orImage,
  ori: oriImage,
  slt: sltImage,
  slti: sltiImage,
  sltiu: sltiuImage,
  sltu: sltuImage,
  sub: subImage,
  subu: subuImage,
  jr: jrImage,
  lbu: lbuImage,
  lhu: lhuImage,
  ll: llImage,
  lui: luiImage,
  nor: norImage,
  sll: sllImage,
  srl: srlImage,
  sb: sbImage,
  sc: scImage,
  sh: shImage,
   
};

const CircuitImage = ({ currentInstruction, registers }) => {
  const [opName] = currentInstruction.trim().split(' ');
  const imageSrc = instructionImages[opName] || defaultImage;

  return (
    <div className="circuit-container">
      <div className="image-wrapper">
        <img src={imageSrc} alt={`Circuito para ${opName}`} />
        {['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'].map((reg) => (
          <div key={reg} className={`register-value ${reg}`}>
            {`0x${registers[reg].toString(16).toUpperCase()}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircuitImage;