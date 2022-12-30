import { useCallback, useEffect, useState } from "react";

export const useKeyboardInput = (keysToListen = []) => {
  const getKeys = useCallback(() => {
    const hookReturn = {};

    keysToListen.forEach((key) => {
      hookReturn[key] = false;
    });

    return {
      hookReturn
    };
  }, [keysToListen]);

  const [keysPressed, setPressedKeys] = useState(getKeys().hookReturn);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPressedKeys((keysPressed) => ({ ...keysPressed, [e.code]: true }));
    };
    const handleKeyUp = (e) => {
      setPressedKeys((keysPressed) => ({ ...keysPressed, [e.code]: false }));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keysToListen, getKeys]);

  return keysPressed;
};
