import React, { useEffect, useState } from "react";
import CanvasElement from "../CanvasElement";
import { Ids } from "../../../../model/Ids.enum";

const InstructionRegister = ({
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
  const svgPathParam = "/components/InstructionRegister.svg";

  return (
    <CanvasElement
      x={x}
      y={y}
      xS={xS}
      yS={yS}
      svgPathParam={svgPathParam}
      activated={activated}
      idParam={Ids.INSTRUCTIONREGISTER}
    />
  );
};
export default InstructionRegister;
