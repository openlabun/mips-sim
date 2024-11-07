import React, { useState } from 'react';
import { translateInstructionToHex } from '../utils/TranslatorFunctions';

const DropArea = ({ setMipsInput, setHexInput }) => {
  const [isHighlight, setIsHighlight] = useState(false);

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    preventDefaults(e);
    const files = e.dataTransfer.files;
    processFiles(files);
    setIsHighlight(false);
  };

  const processFiles = (files) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContent = event.target.result;
      const lines = fileContent.trim().split('\n');

      if (lines.length < 2) {
        console.error("Invalid file format. Expected at least two lines.");
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

    reader.readAsText(files[0]);
  };

  return (
    <div
      id="dropArea"
      onDragEnter={(e) => { preventDefaults(e); setIsHighlight(true); }}
      onDragOver={preventDefaults}
      onDragLeave={(e) => { preventDefaults(e); setIsHighlight(false); }}
      onDrop={handleDrop}
      onMouseEnter={() => document.getElementById('dropArea').style.backgroundColor = '#f0f0f0'}
      onMouseLeave={() => document.getElementById('dropArea').style.backgroundColor = ''}
      className={isHighlight ? 'highlight' : ''}
    >
      Drop files here
    </div>
  );
};

export default DropArea;
