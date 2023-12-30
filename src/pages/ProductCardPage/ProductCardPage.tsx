import { useParams } from 'react-router-dom';
import { BasicTabs } from '../../components/Tabs/Tabs';
import { useEffect, useRef, useState } from 'react';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Dots } from '../../components/Dots/Dots';
import { PhotoSlider } from '../../components/PhotoSlider/PhotoSlider';
import { PhotoPopup } from '../../components/PhotoPopup/PhotoPopup';
import { useDisableScroll } from '../../hooks/useDisableScroll';
import './ProductCardPage.scss';
import { ProductCardInfo } from '../../components/ProductCardInfo/PRoductCardInfo';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../../graphql/queries/getAllProducts';
import { IProd } from '../../types/IProduct';
import { QueryComponent } from '../../components/QueryComponent/QueryComponent';

interface QueryData {
  getAllProducts: IProd[];
}

export const ProductCardPage = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { data, error, loading } = useQuery<QueryData>(GET_ALL_PRODUCTS);

  const products = data?.getAllProducts;

  const handleOpenPopup = () => {
    setIsPopupOpen(prev => !prev);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
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
    setSlideIndex((prevIndex) => Math.min(prevIndex + 1, (product?.images?.length || 0)));
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

  useDisableScroll('no-scroll', isPopupOpen);

  const product = data?.getAllProducts?.find(prod => prod.id === +id);

  return (
    <>
      <div className='product'>
        <QueryComponent error={error} errorMessage='photos' isLoading={loading}>
          <PhotoPopup
            product={product}
            selectedPhotoIndex={slideIndex}
            onClose={handleClosePopup}
            isPopupOpen={isPopupOpen}
          />
        </QueryComponent>
        <div className='product__content'>
          <div className='product__wrapper'>
            <div className='product__photo'>
              <QueryComponent error={error} errorMessage='photos' isLoading={loading}>
                <PhotoSlider
                  product={product}
                  slideIndex={slideIndex}
                  onOpenPopup={handleOpenPopup}
                  handlePrevSlide={handlePrevSlide}
                  handleNextSlide={handleNextSlide}
                />
              </QueryComponent>
            </div>
            <QueryComponent error={error} errorMessage='photos' isLoading={loading}>
              <Dots
                product={product}
                setSlideIndex={setSlideIndex}
                slideIndex={slideIndex}
                handlePrevSlide={handlePrevSlide}
                handleNextSlide={handleNextSlide}
              />
            </QueryComponent>
          </div>
          <QueryComponent error={error} errorMessage='photos' isLoading={loading}>
            <ProductCardInfo
              product={product}
              modalRef={modalRef}
              deliveryInfoOpened={deliveryInfoOpened}
              showDeliveryInfo={showDeliveryInfo}
              error={error}
              loading={loading}
            />
          </QueryComponent>
        </div>
        <div className='product__tabs'>
          <BasicTabs id={+id} products={products} />
        </div>
      </div>
      <ProductSlider title='Similar products' />
      <ProductSlider title='Other customers also bought' />
      <ProductSlider title='Especially for you' />
    </>
  );
};