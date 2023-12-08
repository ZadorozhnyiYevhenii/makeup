import { FC } from "react";
import { IProd } from "../../types/IProduct";

type Props = {
  product: IProd | undefined,
  slideIndex: number,
}

export const PhotoSlider: FC<Props> = ({product, slideIndex}) => {
  return (
    <ul className='product__photo-slider' style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
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
  )
}