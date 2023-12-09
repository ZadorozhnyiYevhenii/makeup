import { FC } from "react";
import cn from 'classnames';
import { IProd } from "../../types/IProduct";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useWindowResize } from "../../hooks/useWindowResize";

type Props = {
  product: IProd | undefined,
  setSlideIndex: (ind: number) => void,
  slideIndex: number,
  handlePrevSlide: () => void,
  handleNextSlide: () => void,
}

export const Dots: FC<Props> = ({
  product,
  setSlideIndex,
  slideIndex,
  handlePrevSlide,
  handleNextSlide
}) => {
  const isMobile = useWindowResize(1023)

  return (
    <div className='product__dots'>
      {isMobile ? (
        <>
          {product?.img && Array.from({ length: product?.img.length }).map((_, ind) => (
            <div
              key={ind}
              onClick={() => setSlideIndex(ind)}
              className={cn('slider-top__dot', {
                active: ind === slideIndex,
              })}
            />
          ))}
        </>
      ) : (
        <div className='product__dots-desktop'>
          <button
            onClick={handlePrevSlide}
            disabled={slideIndex === 0}
            className='product__dots-button'
            style={{ cursor: 'pointer' }}
          >
            <KeyboardArrowLeftIcon />
          </button>
          {product?.img.map((ph, ind) => (
            <div
              key={ind}
              onClick={() => setSlideIndex(ind)}
              className={cn('product__photo-dot', {
                active: ind === slideIndex,
              })}
            >
              <img src={ph} alt={`${ph} + ${ind}`} className='product__dot-item' />
            </div>
          ))}
          <button
            onClick={handleNextSlide}
            disabled={slideIndex === (product?.img?.length || 0) - 1}
            className='product__dots-button'
            style={{ cursor: 'pointer' }}
          >
            <KeyboardArrowRightIcon />
          </button>
        </div>
      )}
    </div>
  )
}