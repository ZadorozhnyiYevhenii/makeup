import React, { memo, useCallback, useEffect, useState } from "react";
import { sliderPhotoDesktop, sliderPhotoMobile } from "../../assets/MockSliderMobile";
import './SliderMain.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const SliderMain: React.FC = memo(() => {
  const [sliderPhoto, setSliderPhoto] = useState<string[]>([]);
  const [slideInd, setSlideInd] = useState<number>(0);

  const [imageHeight, setImageHeight] = useState<number>(0);

  const handleImageLoad = (index: number, height: number) => {
    if (index === slideInd) {
      setImageHeight(height);
    }
  };

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
  }, [slideInd]);

  const handleNextClick = useCallback(() => {
    setSlideInd((prev) => (prev + 1) % sliderPhoto.length);
  }, [sliderPhoto]);

  const handlePrevClick = useCallback(() => {
    setSlideInd((prev) => prev === 0
      ? sliderPhoto.length - 1
      : prev - 1);
  }, [sliderPhoto]);

  useEffect(() => {
    const interval = setInterval(handleNextClick, 3000);

    return () => clearInterval(interval);
  }, [handleNextClick])

  return (
    <div className="slider" style={{
      height: imageHeight ? `${imageHeight}px` : 'auto',
    }}>
      <ul className="slider__slides">
        <div className="slider__arrows">
          <button
            type="button"
            className="slider__arrow slider__arrowLeft"
            onClick={handlePrevClick}
          >
            <ChevronLeftIcon />
          </button>
          <button
            className="slider__arrow slider__arrowRight"
            onClick={handleNextClick}
          >
            <ChevronRightIcon />
          </button>
        </div>
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
                onLoad={(e) => handleImageLoad(index, (e.target as HTMLImageElement).height)}
              />
          </li>
        ))}
      </ul>
    </div>
  )
});