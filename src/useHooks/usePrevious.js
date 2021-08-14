import { useEffect, useRef } from "react";

const usePrevious = state => {
  const ref = useRef(state);
  useEffect(() => {
    ref.current = state;
  }, [state]);
  return ref.current;
};

export const useRenderCount = () => {
  const ref = useRef(0);
  useEffect(() => {
    ref.current++;
    console.log(ref);
  });
  return ref.current;
};
export default usePrevious;
