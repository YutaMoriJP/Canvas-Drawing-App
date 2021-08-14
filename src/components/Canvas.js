import React, { useRef, useEffect, useState } from "react";
import CanvasStyled from "../styles/Canvas";
import useResize from "../useHooks/useResize";
import ClearCanvas from "../components/ClearCanvas";
import useOpen from "../useHooks/useOpen";

const Canvas = ({ canvasRef }) => {
  //state for re-setting canvas
  const [open, toggle] = useOpen(false);

  //resized state that tracks when window is resized
  const resized = useResize();

  //state - onMouseDown = true & onMouseDown = false
  const [isDrawing, setIsDrawing] = useState(false);
  //refs
  const contextRef = useRef(null);
  window.contextRef = contextRef;
  //event handlers
  const handleMouseMove = event => {
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
    console.log("%cCanvas useEffect", "color:red");
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
  }, [open, contextRef, canvasRef, resized]);

  //when the resize event is fired, at that point, contextRef is already initialized
  //although useResize's useEffect runs first
  //so the call order in this case does not matter
  //but to have a clearn mental model, call it after the useEffect above
  useResize(canvasRef, contextRef);
  return (
    <>
      <ClearCanvas toggle={toggle} />
      <CanvasStyled
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      ></CanvasStyled>
    </>
  );
};

export default Canvas;
