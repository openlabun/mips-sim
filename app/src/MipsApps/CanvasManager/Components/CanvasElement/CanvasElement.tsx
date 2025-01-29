import React, { useEffect, useState } from "react";
import { useCanvasContext } from "../../../CanvasContext/CanvasContext";

const CanvasElement = ({
  x,
  y,
  xS,
  yS,
  svgPathParam,
  activated,
  idParam,
}: {
  x: number;
  y: number;
  xS: number;
  yS: number;
  svgPathParam: string;
  activated: boolean;
  idParam: string;
}) => {
  const { createElementWithSvg, redrawElement } = useCanvasContext();
  const [id, setId] = useState<string>(idParam);

  useEffect(() => {
    const newId = createElementWithSvg(svgPathParam, {
      x,
      y,
      xS,
      yS,
      id: idParam,
    });
    setId(newId!);
  }, []);

  useEffect(() => {
    if (id) {
      console.log(`Redrawing element with id: ${id}, activated: ${activated}`);
      redrawElement(id, {
        opacity: activated ? 1.0 : 0.5,
        filter: activated ? "none" : "grayscale(100%)",
      });
    }
  }, [activated, id, redrawElement]);

  return null;
};

export default CanvasElement;
