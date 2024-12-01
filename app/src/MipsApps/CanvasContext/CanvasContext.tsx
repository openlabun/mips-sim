import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
} from "react";

interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  createElementWithSvg: (
    svgPath: string,
    { x, y, xS, yS }: { x: number; y: number; xS: number; yS: number }
  ) => void;
  getElementById: (id: string) => CanvasElement | undefined;
  redrawElement: (
    id: string,
    options?: { opacity?: number; filter?: string }
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
  const elementsRef = useRef<Map<string, CanvasElement>>(new Map());
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      adjustCanvasSize(canvas);
    }
  }, []);

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
    const element = elementsRef.current.get(id);
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
        ctx.filter =
          element.filter ??
          "contrast(1.4) sepia(1) drop-shadow(-9px 9px 3px #e81)";

        ctx.drawImage(
          element.img,
          element.x,
          element.y,
          element.img.width * element.xS,
          element.img.height * element.yS
        );
        ctx.restore();
      }
    }
  };

  const redrawAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      elementsRef.current.forEach((element) => {
        const { x, y, xS, yS, img, opacity, filter } = element;

        ctx.save();
        ctx.globalAlpha = opacity ?? 1.0;
        ctx.filter = filter ?? "none";

        ctx.drawImage(img, x, y, img.width * xS, img.height * yS);
        ctx.restore();
      });
    }
  };

  const createElementWithSvg = (
    svgPath: string,
    { x, y, xS, yS }: { x: number; y: number; xS: number; yS: number }
  ): string => {
    const id = generateUniqueId();

    // Asegúrate de que `svgPath` sea una ruta relativa o absoluta válida a tu archivo local.
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          const width = img.width * xS;
          const height = img.height * yS;

          ctx.drawImage(img, x, y, width, height);

          // Guardar el elemento en el mapa
          elementsRef.current.set(id, {
            id,
            svgPath,
            x,
            y,
            xS,
            yS,
            img,
            ctx,
            opacity: 1.0, // Valor inicial predeterminado
            filter: "none", // Sin filtro por defecto
          });
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
    return elementsRef.current.get(id);
  };
  return (
    <CanvasContext.Provider
      value={{ canvasRef, createElementWithSvg, getElementById, redrawElement }}
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
