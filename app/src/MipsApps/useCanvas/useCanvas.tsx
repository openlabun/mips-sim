import React from "react";
import { useRef, useEffect } from "react";

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    
  }, []);



  const createElement = (svg: SVGAElement, x: number, y: number) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    const svgString = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      ctx!.drawImage(img, x, y);
    };
    img.src = "data:image/svg+xml," + encodeURIComponent(svgString);
  };

  return { canvasRef, createElement };
};

export default useCanvas;

