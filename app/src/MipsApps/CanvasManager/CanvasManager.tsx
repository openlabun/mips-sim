import React from "react";
import "./CanvasManager.css";
import { useCanvasContext } from "../CanvasContext/CanvasContext";
import { Control } from "./Components";
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
    </div>
  );
};

export default CanvasManager;
