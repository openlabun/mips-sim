import React, { useEffect, useState } from "react";
import CanvasElement from "../CanvasElement";

const Control = ({
  x,
  y,
  xS,
  yS,
  svgPathParam,
  
  value,
}: {
  x: number;
  y: number;
  xS: number;
  yS: number;
  svgPathParam: string;
  
  value: number;
}) => {
  const [activated, setActivates] = useState(true);
  useEffect(() => {}, [ value]);
  return (
    <CanvasElement
      x={x}
      y={y}
      xS={xS}
      yS={yS}
      svgPathParam={svgPathParam}
      activated={activated}
    />
  );
};
export default Control;
