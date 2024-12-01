import React, { useEffect, useState } from "react";
import CanvasElement from "../CanvasElement";

const Control = ({
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
  const svgPathParam = "/components/Control.svg";
  useEffect(() => {}, [value]);
  return (
    <CanvasElement
      x={x}
      y={y}
      xS={xS}
      yS={yS}
      svgPathParam={svgPathParam}
      activated={activated}
      idParam="control"
    />
  );
};
export default Control;
