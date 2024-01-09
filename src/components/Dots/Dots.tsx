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
          {product?.images.map(img => img.imageLink) && Array.from({ length: product?.images.length }).map((img, ind) => (
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
          {!!product?.images.length && (
            <button
            onClick={handlePrevSlide}
            disabled={slideIndex === 0}
            className='dots__button'
          >
            <KeyboardArrowLeftIcon />
          </button>
          )}
          {product?.images.map((img, ind) => (
            <div
              key={img.id}
              onClick={() => setSlideIndex(img.id - 1)}
              className={cn('dots__photo-dot', {
                active: ind === slideIndex,
              })}
            >
              <img src={img.imageLink} alt={`${product.name} + ${ind}`} className='dots__dot-item' />
            </div>
          ))}
          {!!product?.images.length && (
            <button
            onClick={handleNextSlide}
            disabled={slideIndex === (product?.images?.length || 0) - 1}
            className='dots__button'
          >
            <KeyboardArrowRightIcon />
          </button>
          )}
        </div>
      )}
    </div>
  )
}