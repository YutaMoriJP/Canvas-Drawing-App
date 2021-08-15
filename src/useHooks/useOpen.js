import { useCallback, useState } from "react";

const useOpen = () => {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(previousOpen => !previousOpen), []);
  return [open, toggle];
};

export default useOpen;
