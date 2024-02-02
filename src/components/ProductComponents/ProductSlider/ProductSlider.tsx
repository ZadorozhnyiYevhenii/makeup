import React, { useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import cn from 'classnames';
import { useWindowResize } from "../../../hooks/useWindowResize";
import { useSwipeable } from "react-swipeable";
import { handleSwipe } from "../../../helpers/swipe";
import { ApolloError,  } from "@apollo/client";
import { IProd } from "../../../types/IProduct";
import { QueryComponent } from "../../QueryComponent/QueryComponent";
import './ProductSlider.scss';

type Props = {
  title: string,
  products: IProd[],
  error: ApolloError | undefined,
  loading: boolean
}

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  error,
  loading 
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrevSlide = () => {
    setSlideIndex((prevIndex) => Math.max(prevIndex - 2, 0));
  };

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => Math.min(prevIndex + 2, products?.length - 2));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left', handleNextSlide, handlePrevSlide),
    onSwipedRight: () => handleSwipe('right', handleNextSlide, handlePrevSlide),
  });

  const isMobile = useWindowResize(1023);

  const nextButtonDisabled = isMobile ? slideIndex === products.length - 2 : slideIndex === products.length - 5;

  const prevButtonDisabled = slideIndex === 0;

  return (
    <>
      <div className="slider-top">
        <h2 className="slider-top__title">{title}</h2>
        <div className="slider-top__content">
          {isMobile ? (
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
                data-testid="prev-slide"
              >
                <WestIcon />
              </button>
              <button
                onClick={handleNextSlide}
                disabled={nextButtonDisabled}
                className="slider-top__button"
                data-testid="next-slide"
              >
                <EastIcon />
              </button>
            </>
          )}

        </div>
      </div>
      <div className="productSlider">
        <ul className="productSlider__list" data-testid="productSlider__list" style={{ transform: `translateX(-${slideIndex * 50}%)` }} {...handlers}>
          <QueryComponent isLoading={loading} error={error} errorMessage="products">
            {products.map((prod) => (
              <li className="productSlider__item" key={prod.id} data-testid="productSlider__item">
                <ProductCard id={prod.id} />
              </li>
            ))}
          </QueryComponent>
        </ul>
      </div>
    </>
  );
};