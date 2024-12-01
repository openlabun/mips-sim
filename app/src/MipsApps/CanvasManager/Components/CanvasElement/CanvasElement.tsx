import React, { useEffect, useState } from "react";
import { useCanvasContext } from "../../../CanvasContext/CanvasContext";

const CanvasElement = ({
  x,
  y,
  xS,
  yS,
  svgPathParam,
  activated,
}: {
  x: number;
  y: number;
  xS: number;
  yS: number;
  svgPathParam: string;
  activated: boolean;
}) => {
  const { createElementWithSvg, redrawElement } = useCanvasContext();
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const newId = createElementWithSvg(svgPathParam, { x, y, xS, yS });
    setId(newId!);
  }, [createElementWithSvg, svgPathParam, x, y, xS, yS]);

  useEffect(() => {
    if (id) {
      console.log(`Redrawing element with id: ${id}, activated: ${activated}`);
      redrawElement(id, {
        opacity: activated ? 1.0 : 0.5,
        filter: activated ? "none" : "blur(100px)",
      });
    }
  }, [activated, id, redrawElement]);

  return null;
};

export default CanvasElement;
