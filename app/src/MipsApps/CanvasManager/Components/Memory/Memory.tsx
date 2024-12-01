import React, { useEffect, useState } from "react";
import CanvasElement from "../CanvasElement";
import { assignInstructionVariables } from "../../../../utils/UtilsVariablesFuntion";
const Memory = ({
  x,
  y,
  xS,
  yS,

  value,
}: {
  x: number;
  y: number;
  xS: number;
  yS: number;
  value: string;
}) => {
  const [activated, setActivates] = useState(true);
  const svgPathParam = "/components/Memory.svg";
  useEffect(() => {
    if (value === "") return;
    const instructions = assignInstructionVariables(value);
    if (instructions.MemWrite === 1 || instructions.MemRead === 1) {
      setActivates(true);
    } else {
      setActivates(false);
    }
  }, [value]);
  return (
    <CanvasElement
      x={x}
      y={y}
      xS={xS}
      yS={yS}
      svgPathParam={svgPathParam}
      activated={activated}
      idParam="memory"
    />
  );
};
export default Memory;
