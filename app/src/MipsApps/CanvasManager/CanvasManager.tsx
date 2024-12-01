import React, { useEffect } from "react";

import "./CanvasManager.css";
import { useCanvasContext } from "../CanvasContext/CanvasContext";
const CanvasManager = () => {
  const { canvasRef, createElementWithSvg } = useCanvasContext();

  useEffect(() => {
    const svgPath = "/components/Control.svg";
    console.log(`Loading SVG from: ${svgPath}`);

    createElementWithSvg(svgPath, { x: 24 ,y: 24, xS: 2.4, yS: 2.1 });
  }, [createElementWithSvg]);

  return <canvas ref={canvasRef} id="canvas" width="800" height="600"></canvas>;
};

export default CanvasManager;
