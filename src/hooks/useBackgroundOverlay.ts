import { useEffect } from "react"

export const useBackgroundOverlay = (condition: boolean) => {
  useEffect(() => {
    if (condition) {
      document.body.classList.add('background-overlay');
    } else {
      document.body.classList.remove('background-overlay');
    }

    return () => {
      document.body.classList.remove('background-overlay');
    };
  }, [condition]);
}