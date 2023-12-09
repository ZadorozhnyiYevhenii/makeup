import { FC, useState } from "react";
import { IProd } from "../../types/IProduct";
import { useSwipeable } from "react-swipeable";

type Props = {
  product: IProd | undefined,
  slideIndex: number,
  onOpenPopup?: () => void,
  handleNextSlide: () => void,
  handlePrevSlide: () => void,
}

export const PhotoSlider: FC<Props> = ({
  product,
  slideIndex,
  onOpenPopup,
  handleNextSlide,
  handlePrevSlide
}) => {

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
  });

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      handleNextSlide();
    } else if (direction === 'right') {
      handlePrevSlide();
    }
  };
  
  return (
    <div className="product__photo-slider" style={{ transform: `translateX(-${slideIndex * 100}%)` }} {...handlers}>
      {product?.img.map((image, index) => (
        <div key={index} className="product__photo-item" onClick={onOpenPopup}>
            <img
              src={image}
              alt={`${product?.name} img`}
            />
        </div>
      ))}
    </div>
  );
}