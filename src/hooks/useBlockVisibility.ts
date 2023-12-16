import { useState } from "react"

export const useBlockVisibility = () => {
  const [isBrandBlockOpen, setIsBrandBlockOpen] = useState(false);
  const [isTypeBlockOpen, setIsTypeBlockOpen] = useState(false);

  const handleOpenBlock = (blockType: string) => {
    if (blockType === 'brand') {
      setIsBrandBlockOpen(prev => !prev);
    } else if (blockType === 'type') {
      setIsTypeBlockOpen(prev => !prev);
    }
  };

  return { isBrandBlockOpen, isTypeBlockOpen, handleOpenBlock };
}