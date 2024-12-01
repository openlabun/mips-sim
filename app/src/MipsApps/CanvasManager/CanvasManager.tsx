import React from "react";
import "./CanvasManager.css";
import { useCanvasContext } from "../CanvasContext/CanvasContext";
import {
  CanvasArrow,
  Control,
  Memory,
  Register,
  InstructionRegister,
} from "./Components";
import { Ids } from "../../model/Ids.enum";

const CanvasManager = ({ value }: { value: string }) => {
  const { canvasRef } = useCanvasContext();

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} id="canvas" width="800" height="600"></canvas>
      <Control x={650} y={0} xS={1} yS={1} value={value} />
      <Memory x={2} y={350} xS={1.2} yS={1.2} value={value} />
      <Register x={800} y={350} xS={1.2} yS={1.2} value={value} />
      <InstructionRegister x={430} y={350} xS={1.2} yS={1.2} value={value} />
      <CanvasArrow fromId={Ids.MEMORY} toId={Ids.CONTROL} />
    </div>
  );
};

export default CanvasManager;
