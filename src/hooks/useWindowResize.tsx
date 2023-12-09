import { useEffect, useState } from "react";

export const useWindowResize = (px: number) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= px);

  useEffect(() => {
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