import { useCallback, useEffect, useRef } from "react";
/**
 *
 * @param {string} key - key value of localstorage
 * @param {any} data - data to be stored in localstorage, i.e. the drawn canvas context
 * @param {boolean} reset -controls when localStorage should be called again
 * @returns
 */
const useLocalStorage = (key, data, reset) => {
  //hold reference to previous key from previous render, so that previous key storage can be deleted
  const ref = useRef(key);
  //helper function to set localStorage
  const setItem = useCallback(
    (key, data) =>
      localStorage.setItem(
        key,
        typeof data === "object" ? JSON.stringify(data) : data
      ),
    []
  );
  //helper function to retrieve data from localstorage
  const getItem = useCallback(key => {
    const storedData = localStorage.getItem(key);
    if (null === storedData) return null;
    try {
      const convertedData = JSON.parse(storedData);
      return convertedData;
    } catch (error) {
      console.log("error", error);
      return storedData;
    }
  }, []);
  //helper function to remove data from localStorage
  const removeItem = useCallback(key => localStorage.removeItem(key), []);
  useEffect(() => {
    let previousKey = ref.current;
    //if previous key is different than new key, removeItem
    if (previousKey !== key) {
      localStorage.removeItem(key);
    }
    setItem(key, data);
    //change reference of previous to new key, so it can be used in the next effect
    ref.current = key;
  }, [setItem, key, data, reset]);
  return {
    getItem,
    removeItem,
  };
};

export default useLocalStorage;
