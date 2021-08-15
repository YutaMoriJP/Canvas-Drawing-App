import React, { useEffect, useRef, useState } from "react";

const draw = (x, y, ctx) => {
  //ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.lineTo(x, y);
  ctx.stroke();
  //ctx.fill(); - fils the stroke
};
const CanvasMock = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasContext = useRef(null);
  const canvasRef = useRef(null);
  const handleMouseDown = ({ nativeEvent: { offsetX: x, offsetY: y } }) => {
    canvasContext.current.beginPath();
    canvasContext.current.moveTo(x, y);
    setIsDrawing(true);
  };
  const handleMouseUp = () => {
    canvasContext.current.closePath();
    setIsDrawing(false);
  };
  const handleMouseMove = ({ nativeEvent: { offsetX: x, offsetY: y } }) => {
    if (!isDrawing) return;
    draw(x, y, canvasContext.current);
  };
  useEffect(() => {
    canvasRef.current.width = window.innerWidth * 2;
    canvasRef.current.height = window.innerHeight * 2;
    canvasRef.current.style.width = "100%";
    canvasRef.current.style.height = "80%";
    const context = canvasRef.current.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "white";
    context.lineWidth = 2;
    canvasContext.current = context;
  }, []);
  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    ></canvas>
  );
};

export default CanvasMock;
