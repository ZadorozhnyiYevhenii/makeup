import React, { useCallback, useEffect, useState } from "react";
import { sliderPhotoDesktop } from "../../MockSliderPhoto";
import { sliderPhotoMobile } from "../../MockSliderMobile";
import './SliderMain.scss';

export const SliderMain: React.FC = () => {
  const [sliderPhoto, setSliderPhoto] = useState<string[]>([]);
  const [slideInd, setSlideInd] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 641;
      setSliderPhoto(isMobile ? sliderPhotoMobile : sliderPhotoDesktop)
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleNextClick = useCallback(() => {
    setSlideInd((prev) => (prev + 1) % sliderPhoto.length);
  }, [sliderPhoto.length]);

  const handlePrevClick = () => {
    setSlideInd((prev) => prev === 0
    ? sliderPhoto.length - 1
    : prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(handleNextClick, 3000);

    return () => clearInterval(interval);
  }, [handleNextClick])

  return (
    <div className="slider">
      <button
        type="button"
        className="slider__arrowLeft"
        onClick={handlePrevClick}
      >
      </button>
      <ul className="slider__slides">
        {sliderPhoto.map((img, index) => (
          <li 
            className="slider__slide" 
            key={index}
            style={{
              opacity: index === slideInd ? 1 : 0,
            }}
          >
            <img 
              src={img} 
              alt={`${img}-${index}`} 
              className="slider__img"
            />
          </li>
        ))}
      </ul>
      <button
        className="slider__arrowRight"
        onClick={handleNextClick}
      >
      </button>
    </div>
  )
}