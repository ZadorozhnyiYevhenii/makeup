type Direction = 'left' | 'right' | 'invalid';

export const handleSwipe = (
  direction: Direction,
  nextSlide: () => void,
  prevSlide: () => void,
) => {
  if (direction === 'left') {
    nextSlide();
  } else if (direction === 'right') {
    prevSlide();
  } else {
    console.warn(`Invalid direction: ${direction}`);
  }
};