import { useEffect, useState } from "react";

const useResize = () => {
  const [resized, setResized] = useState(false);
  useEffect(() => {
    const handleResize = () => setResized(prevResized => !prevResized);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return resized;
};

export default useResize;

/*
const useResize = (canvasRef, contextRef) => {
  useEffect(() => {
    console.log("useResize useEffect", canvasRef);
    const onresize = () => {
      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;
      const context = contextRef.current;
      context.lineCap = "round";
      context.strokeStyle = "white";
      context.lineWidth = 2;
      /*
      const canvasCopy = canvasRef.current.toDataURL();
      contextRef.current.drawImage(img, 0, 0);
      const copyCanvas = { ...canvasRef };
      const copy = { ...contextRef };
      contextRef.current.drawImage(copyCanvas.current, 0, 0);

      //reference
      inMemCanvas.width = canvasRef.width;
      inMemCanvas.height = canvasRef.height;
      inMemCtx.drawImage(canvasRef, 0, 0);
      canvasRef.width = 1000;
      ctx.drawImage(inMemCanvas, 0, 0);
 
    };
    window.addEventListener("resize", onresize);
    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, []);
};
 */
