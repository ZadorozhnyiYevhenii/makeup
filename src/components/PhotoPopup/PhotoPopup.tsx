import React, { useState, useEffect } from 'react';
import { CrossIcon } from '../../assets/CrossIcon';
import { IProd } from '../../types/IProduct';
import cn from 'classnames';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { mobile } from '../../helpers/mobilePX';

interface PhotoPopupProps {
  product: IProd | undefined;
  selectedPhotoIndex: number | null;
  onClose: () => void;
}

const PhotoPopup: React.FC<PhotoPopupProps> = ({ product, selectedPhotoIndex, onClose }) => {
  const [slideIndex, setSlideIndex] = useState(selectedPhotoIndex || 0);
  const [isMobile, setIsMobile] = useState(mobile);

  const handlePrevSlide = () => {
    setSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => Math.min(prevIndex + 1, (product?.img?.length || 0) - 1));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (selectedPhotoIndex === null || !product) {
    return null;
  }

  return (
    <div className='product__popup'>
      <div onClick={onClose} className='product__cross'>
        <CrossIcon />
      </div>
      <div className='product__popup-content'>
        <h2 className='product__name'>{product?.name}</h2>
        <h3 className='product__type'>{product?.type}</h3>
      </div>
      <div>
        <ul className='product__photo-slider' style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
          {product?.img.map((image, index) => (
            <li key={index} className='product__photo-item'>
              <img
                src={image}
                alt={`${product?.name} img`}
                className='product__img-popup'
              />
            </li>
          ))}
        </ul>
        {isMobile ? (
          <div className='product__dots-mobile'>
            {product?.img && Array.from({ length: product?.img.length }).map((_, ind) => (
              <div
                key={ind}
                onClick={() => setSlideIndex(ind)}
                className={cn('slider-top__dot', {
                  active: ind === slideIndex,
                })}
              />
            ))}
          </div>
        ) : (
          <div className='product__dots-desktop'>
            <button onClick={handlePrevSlide} disabled={slideIndex === 0}>
              <KeyboardArrowLeftIcon />
            </button>
            {product?.img.map((_, ind) => (
              <div
                key={ind}
                onClick={() => setSlideIndex(ind)}
                className={cn('product__photo-dot', {
                  active: ind === slideIndex,
                })}
              />
            ))}
            <button onClick={handleNextSlide} disabled={slideIndex === (product?.img?.length || 0) - 1}>
              <KeyboardArrowRightIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoPopup;
