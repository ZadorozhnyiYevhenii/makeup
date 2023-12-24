import { FC } from "react";
import { IProd } from "../../types/IProduct";
import { useSwipeable } from "react-swipeable";
import { handleSwipe } from "../../helpers/swipe";
import cn from 'classnames';
import './PhotoSlider.scss';

type Props = {
  product: IProd | undefined,
  slideIndex: number,
  onOpenPopup?: () => void,
  handleNextSlide: () => void,
  handlePrevSlide: () => void,
  styleOnPopup?: boolean,
}

export const PhotoSlider: FC<Props> = ({
  product,
  slideIndex,
  onOpenPopup,
  handleNextSlide,
  handlePrevSlide,
  styleOnPopup
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left', handleNextSlide, handlePrevSlide),
    onSwipedRight: () => handleSwipe('right', handleNextSlide, handlePrevSlide),
  });

  return (
    <div 
      className='photo-slider' 
      style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      {...handlers}
    >
      {product?.img.map((image, index) => (
        <div key={index} className={cn('photo-slider__item', {
          'photo-slider__item--active': styleOnPopup
        })} onClick={onOpenPopup}>
            <img
              src={image}
              alt={`${product?.name} img`}
            />
        </div>
      ))}
    </div>
  );
}