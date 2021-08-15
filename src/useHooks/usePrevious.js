import { useEffect, useRef } from "react";

/**
 *
 * @param {any} state - state value from previous render
 * @returns
 */

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
  });
  return ref.current;
};
export default usePrevious;
