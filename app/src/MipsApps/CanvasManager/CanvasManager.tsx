import React from "react";
import "./CanvasManager.css";
import { useCanvasContext } from "../CanvasContext/CanvasContext";
import { Control, Memory, Register} from "./Components";


const CanvasManager = () => {
  const { canvasRef } = useCanvasContext();

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} id="canvas" width="800" height="600"></canvas>
      <Control
        x={650}
        y={200}
        xS={3}
        yS={2}
        svgPathParam="/components/Control.svg"
        value={4}
      />
      <Memory
        x={100}
        y={100}
        xS={3}
        yS={2}
        svgPathParam="/components/Memory.svg"
        value={4}
        />
      <Register
        x={100}
        y={350}
        xS={3}
        yS={2}
        svgPathParam="/components/Registers.svg"
        value={4}
      />
    </div>
  );
};

export default CanvasManager;
