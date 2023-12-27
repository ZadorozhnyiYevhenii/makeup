import React from "react";
import './ProductCard.scss';
import { products } from "../../MockProducts";
import { ScrollTopLink } from "../../helpers/scrollTopLink";
import { PurchaseButton } from "../PurchaseButton/PurchaseButton";

type Props = {
  id: number,
}

export const ProductCard: React.FC<Props> = ({ id }) => {
  const product = products.find(prod => prod.id === id);

  if (!product) {
    return null;
  }

  return (
    <div className="card">
      <div className="card__wrap">
        <ScrollTopLink to={`/makeup/product/${product?.id}`}>
          <img
            src={product?.img[0]}
            alt="img"
            className="card__photo"
          />
        </ScrollTopLink>
      </div>
      <div className="card__container">
        <div className="card__content">
          <h2 className="card__name">{product?.name}</h2>
          <div className="card__type">{product?.type}</div>
        </div>
        <div className="card__bottom">
          <div className="card__rate">{product?.quantity} ml</div>
          <div className="card__price">{product?.price} $</div>
          <PurchaseButton product={product} />
        </div>
      </div>
    </div>
  );
};