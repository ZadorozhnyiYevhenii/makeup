import React, { memo, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import './ProductSlider.scss';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { products } from "../../MockProducts";
import cn from 'classnames';

type Props = {
  title: string,
}

const mobile = window.innerWidth <= 1024;

export const ProductSlider: React.FC<Props> = memo(({ title }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrevSlide = () => {
    setSlideIndex((prevIndex) => Math.max(prevIndex - 2, 0));
  };

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => Math.min(prevIndex + 2, products.length - 2));
  };

  const nextButtonDisabled = mobile ? slideIndex === products.length - 2 : slideIndex === products.length - 6;

  const prevButtonDisabled = slideIndex === 0;

  return (
    <>
      <div className="slider-top">
        <h2 className="slider-top__title">{title}</h2>
        <div className="slider-top__content">
          {mobile ? (
            <div className="slider-top__dots">
              {Array.from({ length: Math.ceil(products.length / 2) }).map((_, ind) => (
                <div
                  key={ind}
                  onClick={() => setSlideIndex(ind * 2)}
                  className={cn('slider-top__dot', {
                    active: ind * 2 === slideIndex,
                  })}
                />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={handlePrevSlide}
                className="slider-top__button"
                disabled={prevButtonDisabled}
              >
                <WestIcon />
              </button>
              <button
                onClick={handleNextSlide}
                disabled={nextButtonDisabled}
                className="slider-top__button"
              >
                <EastIcon />
              </button>
            </>
          )}

        </div>
      </div>
      <div className="productSlider">
        <ul className="productSlider__list" style={{ transform: `translateX(-${slideIndex * 50}%)` }}>
          {products.map((prod) => (
            <li className="productSlider__item" key={prod.id}>
              <ProductCard id={prod.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
});
