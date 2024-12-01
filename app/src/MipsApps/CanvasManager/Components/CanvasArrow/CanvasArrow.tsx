import React, { useEffect } from "react";
import { useCanvasContext } from "../../../CanvasContext/CanvasContext";

const CanvasArrow = ({ fromId, toId }: { fromId: string; toId: string }) => {
  const { getElementById, drawArrow } = useCanvasContext();

  useEffect(() => {
    const fromElement = getElementById(fromId);
    const toElement = getElementById(toId);

    if (fromElement && toElement) {
      const canvas = fromElement.ctx.canvas;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const fromX = fromElement.x + fromElement.img.width * fromElement.xS;
        const fromY =
          fromElement.y + (fromElement.img.height * fromElement.yS) / 2;
        const toX = toElement.x;
        const toY = toElement.y + (toElement.img.height * toElement.yS) / 2;

        // Save the current state of the canvas
        ctx.save();

        // Set the stroke style
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        // Start drawing the path
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);

        // Draw horizontal and vertical lines
        if (Math.abs(toX - fromX) > Math.abs(toY - fromY)) {
          ctx.lineTo(toX, fromY);
          ctx.lineTo(toX, toY);
        } else {
          ctx.lineTo(fromX, toY);
          ctx.lineTo(toX, toY);
        }

        // Stroke the path
        ctx.stroke();

        // Restore the previous state of the canvas
        ctx.restore();
      }
    }
  }, [fromId, toId, getElementById, drawArrow]);

  return null;
};

export default CanvasArrow;
