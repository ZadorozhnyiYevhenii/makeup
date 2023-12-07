import { useEffect } from "react"

export const useDisableScroll = (classname: string, condition: boolean) => {
  useEffect(() => {
    if (condition) {
      document.body.classList.add(classname);
    } else {
      document.body.classList.remove(classname);
    }

    return () => {
      document.body.classList.remove(classname);
    };
  }, [classname, condition]);
};