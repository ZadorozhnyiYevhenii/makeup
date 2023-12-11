import { FC } from "react";
import cn from 'classnames';
import { IProd } from "../../types/IProduct";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useWindowResize } from "../../hooks/useWindowResize";
import './Dots.scss';

type Props = {
  product: IProd | undefined,
  setSlideIndex: (ind: number) => void,
  slideIndex: number,
  handlePrevSlide: () => void,
  handleNextSlide: () => void,
  isPopupOpen?: boolean
}

export const Dots: FC<Props> = ({
  product,
  setSlideIndex,
  slideIndex,
  handlePrevSlide,
  handleNextSlide,
  isPopupOpen
}) => {
  const isMobile = useWindowResize(1023)

  return (
    <div className='dots'>
      {isMobile ? (
        <>
          {product?.img && Array.from({ length: product?.img.length }).map((_, ind) => (
            <div
              key={ind}
              onClick={() => setSlideIndex(ind)}
              className={cn('dots__dot', {
                active: ind === slideIndex,
              })}
            />
          ))}
        </>
      ) : (
        <div className={cn('dots__desktop', {'dots__desktop--popup': isPopupOpen })}>
          <button
            onClick={handlePrevSlide}
            disabled={slideIndex === 0}
            className='dots__button'
            style={{ cursor: 'pointer' }}
          >
            <KeyboardArrowLeftIcon />
          </button>
          {product?.img.map((ph, ind) => (
            <div
              key={ind}
              onClick={() => setSlideIndex(ind)}
              className={cn('dots__photo-dot', {
                active: ind === slideIndex,
              })}
            >
              <img src={ph} alt={`${ph} + ${ind}`} className='dots__dot-item' />
            </div>
          ))}
          <button
            onClick={handleNextSlide}
            disabled={slideIndex === (product?.img?.length || 0) - 1}
            className='dots__button'
            style={{ cursor: 'pointer' }}
          >
            <KeyboardArrowRightIcon />
          </button>
        </div>
      )}
    </div>
  )
}