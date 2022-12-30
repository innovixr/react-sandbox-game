import { useMemo, useEffect } from "react";

export function useKeyboard() {
  const keyboard = useMemo(() => ({}), []);

  const keydown = (e) => keyboard[e.code] = true;
  const keyup = (e) => keyboard[e.code] = false;

  useEffect(() => {
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("keyup", keyup);
    };
  });

  return keyboard;
}
