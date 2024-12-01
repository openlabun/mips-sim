import React from "react";
import { useRef, useEffect } from "react";

let sharedCanvasRef: React.RefObject<HTMLCanvasElement> | null = null;

const useCanvas = () => {
  if (!sharedCanvasRef) {
    sharedCanvasRef = useRef<HTMLCanvasElement>(null);
  }

  useEffect(() => {
    const canvas = sharedCanvasRef!.current!;
    // Aquí puedes agregar cualquier lógica de inicialización que necesites
  }, []);

  const createElement = (svg: SVGAElement, x: number, y: number) => {
    const canvas = sharedCanvasRef!.current!;
    const ctx = canvas.getContext("2d");
    const svgString = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      ctx!.drawImage(img, x, y);
    };
    img.src = "data:image/svg+xml," + encodeURIComponent(svgString);
  };

  return { canvasRef: sharedCanvasRef, createElement };
};

export default useCanvas;
