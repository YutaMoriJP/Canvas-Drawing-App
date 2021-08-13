import React, { useRef, useState } from "react";
import Link from "../styles/Link";
import Canvas from "./Canvas";

const Download = () => {
  //state
  const [status, setStatus] = useState("Generate Canvas Image");
  //resf
  const linkRef = useRef(null); //for HTMLAnchorElement.href
  const canvasRef = useRef(null); //for HTMLCanvasElement
  const [ready, setReady] = useState(false); //used for downloading behavior

  //event handler for generating download link
  const handleClick = async event => {
    //if ready is true, then image was genearted
    //and this allows the user to download
    //without blocking it with event.preventDefault()
    if (ready) {
      setReady(false);
      setStatus("Generate Canvas Image");
      return;
    }
    //prevents default behavior of downloading
    //the purple is to create flow that processes the download image first
    //and then the user agrees with downloading the image
    //for that setTimeout delays the function from finishing
    //and sets the ready state to true
    event.preventDefault();
    setStatus("Generating Image...");
    const isReady = await new Promise(res => {
      setTimeout(() => res(true), 600);
    });
    setReady(isReady);
    const canvas = canvasRef.current;
    const canvasImage = canvas.toDataURL();
    linkRef.current.href = canvasImage;
    setStatus("Ready to be downloaded");
  };
  return (
    <div>
      <Link href="#" download="canvas" ref={linkRef} onClick={handleClick}>
        {status}
      </Link>
      <Canvas
        linkRef={linkRef}
        canvasRef={canvasRef}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Download;
