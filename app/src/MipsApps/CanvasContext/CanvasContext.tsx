import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
  useState,
} from "react";

interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  createElementWithSvg: (
    svgPath: string,
    {
      x,
      y,
      xS,
      yS,
    }: { x: number; y: number; xS: number; yS: number; id: string }
  ) => void;
  getElementById: (id: string) => CanvasElement | undefined;
  redrawElement: (
    id: string,
    options?: { opacity?: number; filter?: string }
  ) => void;
  drawArrow: (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color?: string
  ) => void;
}
interface CanvasElementProps {
  x: number;
  y: number;
  xS: number;
  yS: number;
}
interface CanvasElement extends CanvasElementProps {
  id: string;
  img: HTMLImageElement;
  svgPath: string;
  ctx: CanvasRenderingContext2D;
  opacity?: number; // Opacidad del elemento (1.0 por defecto)
  filter?: string; // Filtro CSS aplicado al elemento (ej. "grayscale(100%)")
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

interface CanvasProviderProps {
  children: ReactNode;
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<{ [key: string]: CanvasElement }>(
    {}
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      adjustCanvasSize(canvas);
    }
  }, []);
  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string = "black" // Color por defecto
  ) => {
    const headLength = 10; // Longitud de la cabeza de la flecha
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    // Calcular las coordenadas del borde del componente de destino
    const distance = Math.sqrt(dx * dx + dy * dy);
    const offsetX = (dx / distance) * headLength;
    const offsetY = (dy / distance) * headLength;

    const adjustedToX = toX - offsetX;
    const adjustedToY = toY - offsetY;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(adjustedToX, adjustedToY);
    ctx.lineTo(
      adjustedToX - headLength * Math.cos(angle - Math.PI / 6),
      adjustedToY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(adjustedToX, adjustedToY);
    ctx.lineTo(
      adjustedToX - headLength * Math.cos(angle + Math.PI / 6),
      adjustedToY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  const adjustCanvasSize = (canvas: HTMLCanvasElement) => {
    const ratio = window.devicePixelRatio || 1; // Usa la densidad de píxeles del dispositivo
    const width = window.innerWidth; // El ancho de la ventana del navegador
    const height = window.innerHeight; // O el alto que desees, por ejemplo: window.innerHeight

    // Establece el tamaño físico del canvas
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Ajusta el tamaño real (para mantener la resolución)
    canvas.width = width * ratio;
    canvas.height = height * ratio;

    // Escala el contexto del canvas para mantener la resolución
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(ratio, ratio); // Aplica la escala para mantener la calidad
    }
  };
  const redrawElement = (
    id: string,
    options?: { opacity?: number; filter?: string }
  ) => {
    const element = elements[id];
    console.log(elements);
    if (element) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        element.opacity = options?.opacity;
        element.filter = options?.filter;

        ctx.clearRect(
          element.x,
          element.y,
          element.img.width * element.xS,
          element.img.height * element.yS
        );
        console.log("Redrawing element with id: ", id);
        ctx.save();
        ctx.globalAlpha = element.opacity ?? 1.0;
        ctx.filter = element.filter ?? "none";

        ctx.drawImage(
          element.img,
          element.x,
          element.y,
          element.img.width * element.xS,
          element.img.height * element.yS
        );
        ctx.restore();
      }
    } else {
      console.error(`Element with id ${id} not found`);
    }
  };

  const createElementWithSvg = (
    svgPath: string,
    {
      x,
      y,
      xS,
      yS,
      id,
    }: { x: number; y: number; xS: number; yS: number; id: string }
  ): string => {
    // Asegúrate de que `svgPath` sea una ruta relativa o absoluta válida a tu archivo local.
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          const width = img.width * xS;
          const height = img.height * yS;

          const element = {
            id,
            svgPath,
            x,
            y,
            xS,
            yS,
            img,
            ctx,
            opacity: 1.0,
            filter: "none",
          };
          // Guardar el elemento en el mapa
          setElements((prev) => ({ ...prev, [id]: element }));
          redrawElement(id);
        };

        // Usa directamente el path del archivo SVG
        img.src = svgPath;
      } else {
        console.error("Failed to get canvas context");
      }
    } else {
      console.error("Canvas not found");
    }

    return id;
  };

  const generateUniqueId = (): string => {
    return `element-${Math.random().toString(36).substr(2, 9)}`;
  };
  const getElementById = (id: string): CanvasElement | undefined => {
    return elements[id];
  };
  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        createElementWithSvg,
        getElementById,
        redrawElement,
        drawArrow,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvasContext must be used within a CanvasProvider");
  }
  return context;
};
