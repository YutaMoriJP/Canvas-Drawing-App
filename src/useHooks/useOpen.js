import { useState } from "react";

const useOpen = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(t => !t);
  return [open, toggle];
};

export default useOpen;
