import React, { useState } from "react";
import { preventDefaults } from "./utils/preventDefaults";
import { handleDrop } from "./utils/handleDrop";

import "./DropArea.css";

const DropArea = ({ setMipsInput, setHexInput }) => {
  const [isHighlight, setIsHighlight] = useState(false);

  return (
    <div
      id="dropArea"
      onDragEnter={(e) => {
        preventDefaults(e);
        setIsHighlight(true);
      }}
      onDragOver={preventDefaults}
      onDragLeave={(e) => {
        preventDefaults(e);
        setIsHighlight(false);
      }}
      onDrop={(e) => handleDrop(e, setIsHighlight, setMipsInput, setHexInput)}
      onMouseEnter={() =>
        (document.getElementById("dropArea").style.backgroundColor = "#ef476f")
        (document.getElementById("dropArea").style.color = "#f1faee")
      }
      onMouseLeave={() =>
        (document.getElementById("dropArea").style.backgroundColor = "")
        (document.getElementById("dropArea").style.color = "")
      }
      className={`${isHighlight ? "highlight" : ""} drop-area`}
    >
      Drop files here
    </div>
  );
};

export default DropArea;
