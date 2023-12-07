import { useParams } from 'react-router-dom';
import { products } from '../../MockProducts';
import './ProductCardPage.scss';
import cn from 'classnames';
import { BasicTabs } from '../../components/Tabs/Tabs';
import { useEffect, useRef, useState } from 'react';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { SelectMenu } from '../../components/SelectMenu/SelectMenu';
import { mobile } from '../../helpers/mobilePX';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useSwipeable } from 'react-swipeable';


export const ProductCardPage = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef<HTMLUListElement | null>(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
  });

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      handleNextSlide();
    } else if (direction === 'right') {
      handlePrevSlide();
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowDeliveryInfo(false);
    }
  };

  const handlePrevSlide = () => {
    setSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => Math.min(prevIndex + 1, (product?.img?.length || 0) - 1));
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const deliveryInfoOpened = () => {
    setShowDeliveryInfo((prev) => !prev);
  }

  const product = products.find(prod => prod.id === +id);

  return (
    <>
      <div className='product'>
        <div className='product__content'>
          <div className='product__wrapper'>
            <div className='product__photo' {...handlers}>
              <ul className='product__photo-slider' style={{ transform: `translateX(-${slideIndex * 100}%)` }} ref={sliderRef}>
                {product?.img.map((image) => (
                  <li className='product__photo-item'>
                    <img
                      src={image}
                      alt={`${product?.name} img`}
                      className='product__img'
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className='product__dots'>
              {mobile ? (
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
                  >
                    <KeyboardArrowRightIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='product__description'>
            <h1 className='product__name'>{product?.name}</h1>
            <div className='product__type'>{product?.productType}</div>
          </div>
          <div className='product__container'>
            <div className='product__price'>
              {product?.price}
            </div>
            <div className='product__select'>
              <SelectMenu />
            </div>
            <div className='product__buy'>
              <div className='product__button'>Buy</div>
              <div className='product__info'>
                <div className='product__stock'>In stock!</div>
                <div className='product__code'>code:
                  <span className='product__number'> {product?.code}</span>
                </div>
              </div>
              <div
                className='product__delivery'
                onClick={deliveryInfoOpened}
                ref={modalRef}
              >
                <span>Free Delivery!</span>
                {showDeliveryInfo && (
                  <div className='product__delivery-modal'>
                    0 грн - курьером MAKEUP. Минимальная сумма заказа - 169 грн.
                    <br />
                    "Укрпочта" - 0 грн при сумме заказа от 249 грн. Для заказов на сумму от 169 грн до 249 грн - доставка всего 13 грн.
                    <br />
                    Доставка другими перевозчиками — 0 грн. при заказе на сумму от 799 грн.
                    <br />
                    При выборе товара с флажком ЕС — бесплатно со склада в ЕС при сумме заказа от 890 грн
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='product__tabs'>
          <BasicTabs id={+id} />
        </div>
      </div>
      <ProductSlider title='Similar products' />
      <ProductSlider title='Other customers also bought' />
      <ProductSlider title='Especially for you' />
    </>
  );
};