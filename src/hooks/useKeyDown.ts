import { useEffect } from "react";

export const useKeyDown = (key: string, func: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) {
        func();
      }
    }
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown' ,handleKeyDown);
    };
  }, [func, key])
};
