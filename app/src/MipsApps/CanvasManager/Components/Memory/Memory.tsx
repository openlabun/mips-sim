import React, { useEffect, useState } from "react";
import CanvasElement from "../CanvasElement";

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


  value: number;
}) => {
  const [activated, setActivates] = useState(true);
   const svgPathParam = "/components/Memory.svg";
  useEffect(() => {}, [value]);
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
