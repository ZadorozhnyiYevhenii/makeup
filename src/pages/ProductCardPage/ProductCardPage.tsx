import { useParams } from 'react-router-dom';
import { products } from '../../MockProducts';

import './ProductCardPage.scss';
import { BasicTabs } from '../../components/Tabs/Tabs';


export const ProductCardPage = () => {
  const { id = '' } = useParams<{ id: string }>();

  const product = products.find(prod => prod.id === +id);

  return (
    <div className='product'>
      <div className='product__wrapper'>
        <div className='product__photo'>
          <img
            src={product?.img}
            alt={`${product?.name} img`}
            className='product__img'
          />
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
        <div className='product__buy'>
          <div className='product__button'>Buy</div>
          <div className='product__info'>
            <div className='product__stock'>In stock!</div>
            <div className='product__code'>code: 
            <span className='product__number'> {product?.code}</span>
            </div>
          </div>
        </div>
      </div>
      <BasicTabs id={+id} />
    </div>
  );
};