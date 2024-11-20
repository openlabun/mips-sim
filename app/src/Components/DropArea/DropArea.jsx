import React, { useState } from 'react';
import { translateInstructionToMIPS } from '../../utils/TranslatorFunctions';
import './DropArea.css';

const DropArea = ({ setMipsInput, setHexInput }) => {
  const [isHighlight, setIsHighlight] = useState(false);

  const hexToBinary = (hex) => {
    return parseInt(hex, 16).toString(2).padStart(8, '0');
  };

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    preventDefaults(e);
    setIsHighlight(false);

    const files = e.dataTransfer.files;
    if (files.length === 0) {
      console.error('No files dropped');
      return;
    }

    console.log('File dropped:', files[0]);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      console.log('File content:', text);

      const lines = text.split('\n');
      if (lines.length < 2) {
        console.error('File does not contain enough lines');
        return;
      }

      const instructionsArray = lines[1].trim().split(/\s+/);
      let translatedInstructions = '';
      let originalInstructions = '';

      instructionsArray.forEach(instruction => {
        const translated = translateInstructionToMIPS(instruction.trim());
        translatedInstructions += `${translated}\n`;
        originalInstructions += `${instruction.trim()}\n`;
      });

      setMipsInput(translatedInstructions.trim());
      setHexInput(originalInstructions.trim());
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    reader.readAsText(files[0]);
  };

  return (
    <div
      id="dropArea"
      onDragEnter={(e) => { preventDefaults(e); setIsHighlight(true); }}
      onDragOver={preventDefaults}
      onDragLeave={(e) => { preventDefaults(e); setIsHighlight(false); }}
      onDrop={handleDrop}
      onMouseEnter={() => document.getElementById('dropArea').style.backgroundColor = '#9e6868'}
      onMouseLeave={() => document.getElementById('dropArea').style.backgroundColor = ''}
      className={`${isHighlight ? 'highlight' : ''} drop-area`}
    >
      Drop files here
    </div>
  );
};

export default DropArea;
