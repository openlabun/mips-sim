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

        drawArrow(ctx, fromX, fromY, toX, toY, "white");
      }
    }
  }, [fromId, toId, getElementById, drawArrow]);

  return null;
};

export default CanvasArrow;
