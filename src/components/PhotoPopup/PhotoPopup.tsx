import React, { useState } from 'react';
import { CrossIcon } from '../../assets/CrossIcon';
import { IProd } from '../../types/IProduct';
import { Dots } from '../Dots/Dots';
import { PhotoSlider } from '../PhotoSlider/PhotoSlider';
import './PhotoPopup.scss';

type Props = {
  product: IProd | undefined;
  selectedPhotoIndex: number | null;
  onClose: () => void;
}

export const PhotoPopup: React.FC<Props> = ({ product, selectedPhotoIndex, onClose }) => {
  const [slideIndex, setSlideIndex] = useState(selectedPhotoIndex || 0);

  const handlePrevSlide = () => {
    setSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => Math.min(prevIndex + 1, (product?.img?.length || 0) - 1));
  };

  if (selectedPhotoIndex === null || !product) {
    return null;
  }

  return (
    <div className='popup'>
      <div onClick={onClose} className='popup__cross'>
        <CrossIcon />
      </div>
      <div className='popup__content'>
        <h2 className='popup__name'>{product?.name}</h2>
        <h3 className='popup__type'>{product?.type}</h3>
      </div>
      <div>
        <PhotoSlider
          product={product}
          slideIndex={slideIndex}
          handleNextSlide={handleNextSlide}
          handlePrevSlide={handlePrevSlide}
        />
        <div className='popup__dots'>
          <Dots
            product={product}
            setSlideIndex={setSlideIndex}
            handleNextSlide={handleNextSlide}
            handlePrevSlide={handlePrevSlide}
            slideIndex={slideIndex}
          />
        </div>
      </div>
    </div>
  );
};

