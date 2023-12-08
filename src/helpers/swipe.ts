export const handleSwipe = (
  direction: 'left' | 'right',
  nextSlide: () => void,
  prevSlide: () => void,
  ) => {
    if (direction === 'left') {
      nextSlide();
    } else if (direction === 'right') {
      prevSlide();
    }
  };