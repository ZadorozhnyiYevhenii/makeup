import { Link, useLocation, useParams } from 'react-router-dom';
import { BasicTabs } from '../../components/TabComponents/Tabs/Tabs';
import { useEffect, useRef, useState } from 'react';
import { ProductSlider } from '../../components/ProductComponents/ProductSlider/ProductSlider';
import { Dots } from '../../components/Dots/Dots';
import { PhotoSlider } from '../../components/PhotoSlider/PhotoSlider';
import { PhotoPopup } from '../../components/PhotoPopup/PhotoPopup';
import { useDisableScroll } from '../../hooks/useDisableScroll';
import { ProductCardInfo } from '../../components/ProductComponents/ProductCardInfo/PRoductCardInfo';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../../graphql/queries/getAll/getAllProducts';
import { IProd } from '../../types/IProduct';
import { QueryComponent } from '../../components/QueryComponent/QueryComponent';
import { Breadcrums } from '../../components/BreadCrumbs/BreadCrumbs';
import { getProductsForSlider } from '../../helpers/getProductsForSlider';
import { Titles } from '../../utils/titles';
import './ProductCardPage.scss';

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
  const location = useLocation();

  const products = data?.getAllProducts ?? [];

  const productsDermatological = getProductsForSlider(products, 'classification', 'DERMATOLOGICAL')
  const productsByGroup = getProductsForSlider(products, 'productGroup', 'Parfum water')

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
  
  if (data?.getAllProducts === undefined) {
    return null;
  }

  const product = data.getAllProducts.find(prod => prod.id === +id);

  if (!product) {
    return null;
  }

  const categoryId = product?.categories.map(category => category.id)[0]
  const categoryName = product?.categories.map(category => category.name)[0]

  return (
    <div className='container'>
      <div className='container__breadcrumbs'>
        <Breadcrums
          renderOptions={() =>
            <>
              <Link className='breadcrumbs__item' to={`/makeup/category/${categoryId}`}>
                {categoryName}
              </Link>
              <Link className='breadcrumbs__item breadcrumbs__item--active' to={location.pathname}>
                {product?.name}
              </Link>
            </>
          }
        />
      </div>
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
          <BasicTabs id={+id} product={product} />
        </div>
      </div>
      <ProductSlider title={Titles.CLASSIFICATION_DERMATOLOGICAL} products={productsDermatological} error={error} loading={loading} />
      <ProductSlider title={Titles.PARFUME_WATER} products={productsByGroup} error={error} loading={loading} />
    </div>
  );
};