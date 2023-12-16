import { useEffect } from "react"

export const useBackgroundOverlay = (condition: boolean, classname: string) => {
  useEffect(() => {
    if (condition) {
      document.body.classList.add(classname);
    } else {
      document.body.classList.remove(classname);
    }

    return () => {
      document.body.classList.remove(classname);
    };
  }, [condition, classname]);
}