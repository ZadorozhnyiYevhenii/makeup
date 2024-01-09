import { useLayoutEffect, useState } from "react";

export const useWindowResize = (px: number) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= px);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= px);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [px]);

  return isMobile;
};