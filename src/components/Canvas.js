import React, { useRef, useEffect, useState } from "react";
import CanvasStyled from "../styles/Canvas";

const useResize = () => {
  const [resized, setResized] = useState(false);
  useEffect(() => {
    const onresize = () => {
      setResized(previousResize => !previousResize);
    };
    window.addEventListener("resize", onresize);
    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, []);
  return resized;
};

const Canvas = () => {
  //state
  const [isDrawing, setIsDrawing] = useState(false);
  //refs
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  //const resized = useResize();

  //event handlers
  const handleMouseMove = event => {
    console.log("event.offsetX", event.offsetX);
    console.log("event.offsetY", event.offsetY);
    console.log("event.nativeEvent.offsetX", event.nativeEvent.offsetX);
    //check if user is drawing or not
    //checking for false makes the code cleaner and reduces the nesting, if there are multiple if(){if(){if()}}...
    if (!isDrawing) return;
    //user is drawing
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const handleMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    //starts drawing
    contextRef.current.beginPath();
    //controls where it moves to
    contextRef.current.moveTo(offsetX, offsetY);

    //update state - drawing is actively going on
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    //as openPath() starts the drawing, closePath finishes the drawing
    contextRef.current.closePath();
    //update state - drawing has finished
    setIsDrawing(false);
  };

  //initialize canvas API after component has mounted
  useEffect(() => {
    if (contextRef && contextRef.current) {
      return;
    }
    canvasRef.current.width = window.innerWidth * 2;
    canvasRef.current.height = window.innerHeight * 2;
    canvasRef.current.style.width = "100%";
    canvasRef.current.style.height = "80%";
    const context = canvasRef.current.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "white";
    context.lineWidth = 2;
    contextRef.current = context;
  }, []);

  return (
    <CanvasStyled
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    ></CanvasStyled>
  );
};

export default Canvas;
