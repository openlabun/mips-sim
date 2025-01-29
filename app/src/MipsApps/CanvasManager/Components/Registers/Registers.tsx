import React, { useEffect, useState } from "react";
import CanvasElement from "../CanvasElement";
import { assignInstructionVariables } from "../../../../utils/UtilsVariablesFuntion";
import { Ids } from "../../../../model/Ids.enum";
const Register = ({
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
  const svgPathParam = "/components/Registers.svg";
  useEffect(() => {
    const values = assignInstructionVariables(value);
    if (values.RegWrite === 1 || values.RegDst === 1) {
      setActivates(true);
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
      idParam={Ids.REGISTERS}
    />
  );
};
export default Register;
