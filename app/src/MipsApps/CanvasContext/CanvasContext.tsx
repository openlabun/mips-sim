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
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

interface CanvasProviderProps {
  children: ReactNode;
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const createElementWithSvg = (
    svgPath: string,
    { x, y, xS, yS }: { x: number; y: number; xS: number; yS: number }
  ) => {
    const baseUrl = window.location.origin;
    const svgUrl = `${baseUrl}${svgPath}`;
    console.log(`Creating element with SVG from: ${svgUrl}`);

    fetch(svgUrl)
      .then((response) => response.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = svgDoc.documentElement;

        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const svgString = new XMLSerializer().serializeToString(svgElement);
            const img = new Image();
            img.onload = () => {
              const width = img.width * xS;
              const height = img.height * yS;

              // Dibujar la imagen con la escala deseada
              ctx.drawImage(img, x, y, width, height);
            };
            img.src = "data:image/svg+xml," + encodeURIComponent(svgString);
          } else {
            console.error("Failed to get canvas context");
          }
        } else {
          console.error("Canvas not found");
        }
      })
      .catch((error) => {
        console.error(`Error loading SVG from: ${svgUrl}`, error);
      });
  };

  return (
    <CanvasContext.Provider value={{ canvasRef, createElementWithSvg }}>
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
