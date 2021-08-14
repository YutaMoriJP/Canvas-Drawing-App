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
