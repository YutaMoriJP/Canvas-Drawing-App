import { useEffect } from "react";

const useResize = (canvasRef, contextRef) => {
  useEffect(() => {
    console.log("useResize useEffect", canvasRef);
    const onresize = () => {
      const canvasCopy = canvasRef.current.toDataURL();
      //contextRef.current.drawImage(img, 0, 0);
      /*
      inMemCanvas.width = canvasRef.width;
      inMemCanvas.height = canvasRef.height;
      inMemCtx.drawImage(canvasRef, 0, 0);
      canvasRef.width = 1000;
      ctx.drawImage(inMemCanvas, 0, 0);
     */
      const copyCanvas = { ...canvasRef };
      const copy = { ...contextRef };

      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;
      const context = contextRef.current;
      context.lineCap = "round";
      context.strokeStyle = "white";
      context.lineWidth = 2;
      contextRef.current.drawImage(copyCanvas.current, 0, 0);
    };
    window.addEventListener("resize", onresize);
    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, []);
};
export default useResize;
