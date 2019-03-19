import { useState } from "react";

export function useToggle(initial = false) {
  const [on, setToggle] = useState(initial);
  return {
    on,
    set: setToggle,
    reset: () => setToggle(initial),
    toggle: () => setToggle(prev => !prev)
  };
}
