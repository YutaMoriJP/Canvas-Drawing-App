import React, { useRef, useEffect, useState, useCallback } from "react";
import CanvasStyled from "../styles/Canvas";
import useResize from "../useHooks/useResize";
import ClearCanvas from "../components/ClearCanvas";
import useOpen from "../useHooks/useOpen";
import { useRenderCount } from "../useHooks/usePrevious";

/**
 *
 * @param {object} canvasRef - ref passed to <canvas>
 * @returns
 */

const Canvas = ({ canvasRef }) => {
  //STATE
  //state for re-setting canvas, toggle is called when 'CLEAR' is called
  const [open, toggle] = useOpen(false);
  //resized state tracks when window is resized
  const resized = useResize();
  //state - onMouseDown = true & onMouseDown = false - controls whether user is drawing or not
  const [isDrawing, setIsDrawing] = useState(false);

  //REFS
  //context ref that stores canvas.getContext('2d')
  const contextRef = useRef(null);
  //a ref count that counts the render count, used to block calling the handleResize in the effect callback
  const renderCount = useRenderCount();

  //EVENT HANDLERS
  //called when mouse is moved, if isDrawing is true, canvas context's lineTo and stroke are called
  //to capture what the user is drawing
  const handleMouseMove = event => {
    //check if user is drawing or not
    //checking for false makes the code cleaner and reduces the nesting, if there are multiple if(){if(){if()}}...
    if (!isDrawing) return;
    //user is drawing
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  //updates isDrawing state to true, and begins canvas drawing
  const handleMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    //starts drawing
    contextRef.current.beginPath();
    //controls where it moves to
    contextRef.current.moveTo(offsetX, offsetY);

    //update state - drawing is actively going on
    setIsDrawing(true);
  };

  //updates isDrawing state to false, and finishes canvas drawing
  const handleMouseUp = () => {
    //as openPath() starts the drawing, closePath finishes the drawing
    contextRef.current.closePath();
    //update state - drawing has finished
    setIsDrawing(false);
  };
  //called when window is resized to copy previous drawing and re-draw it set the new canvas width/height
  const handleResize = useCallback(() => {
    //create copy of the currently drawn canvas
    const canvas = document.createElement("canvas"); //canvas copy
    const context = canvas.getContext("2d"); //context copy
    canvas.width = window.innerWidth * 2; //resizes canvas
    canvas.height = window.innerHeight * 2; //resizes canvas
    context.drawImage(
      canvasRef.current,
      0,
      0,
      canvas.width / 2,
      canvas.height / 2
    ); //canvas copy gets the copy of canvasRef.current, and re-adjuts to the new window size

    //updates the dimension of the canvas after a re-size
    canvasRef.current.width = window.innerWidth; //reacts to resized window
    canvasRef.current.height = window.innerHeight; //reacts to resized window

    //re-draws the copied canvas
    contextRef.current.drawImage(canvas, 0, 0); //current context gets the copy of the copied canvas
    //context.scale(ratioA, ratioB);
    //re-applies style
    contextRef.current.lineCap = "round";
    contextRef.current.strokeStyle = "white";
    contextRef.current.lineWidth = 4;
  }, [canvasRef]);

  //initialize canvas API after component has mounted and used to clear the canvas
  useEffect(() => {
    //initializes canvas and creates canvas context
    //when open state gets toggled, canvas is cleared
    canvasRef.current.width = window.innerWidth * 2;
    canvasRef.current.height = window.innerHeight * 2;
    canvasRef.current.style.width = "100%";
    canvasRef.current.style.height = "80%";
    const context = canvasRef.current.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "white";
    context.lineWidth = 4;
    contextRef.current = context;
  }, [contextRef, canvasRef, open]);

  //handleResize handles the resized window, by copying the canvas context and changing canvas.width/height
  useEffect(() => {
    //renderCount is used to not run the handleResize function in the initial mount
    if (renderCount) {
      handleResize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resized, handleResize]);

  //when the resize event is fired, at that point, contextRef is already initialized
  //although useResize's useEffect runs first
  //so the call order in this case does not matter
  //but to have a clearn mental model, call it after the useEffect above
  useResize(canvasRef, contextRef);

  console.log("renderCount", renderCount);
  window.contextRef = contextRef;
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
