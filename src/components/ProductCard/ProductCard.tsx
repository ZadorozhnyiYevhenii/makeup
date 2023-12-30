import React from "react";
import './ProductCard.scss';
import { ScrollTopLink } from "../../helpers/scrollTopLink";
import { PurchaseButton } from "../PurchaseButton/PurchaseButton";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BYID } from "../../graphql/queries/getProductById";
import { QueryComponent } from "../QueryComponent/QueryComponent";
import { IProd } from "../../types/IProduct";

type Props = {
  id: number,
}

export const ProductCard: React.FC<Props> = ({ id }) => {
  const { loading, error, data } = useQuery<{ getProductById: IProd }>(
    GET_PRODUCT_BYID,
    { variables: { id: String(id) } }
  );

  const product: IProd | undefined = data?.getProductById;

  if (!product) {
    return null;
  }
  
  const price = product?.productVariations.map(prod => prod.variationDetails.map(p => p.price)[0])[0];
  const quantity = product.productVariations.map(prod => prod.amount)[0];

  console.log(product)
  
  return (
    <>
      <QueryComponent isLoading={loading} error={error} errorMessage="product">
        <div className="card">
          <div className="card__wrap">
            <ScrollTopLink to={`/makeup/product/${product?.id}`}>
              <img
                src={product?.images.map(img => img.imageLink)[0]}
                alt="img"
                className="card__photo"
              />
            </ScrollTopLink>
          </div>
          <div className="card__container">
            <div className="card__content">
              <h2 className="card__name">{product?.name}</h2>
            </div>
            <div className="card__bottom">
              <div className="card__rate">{quantity} ml</div>
              <div className="card__price">{price} $</div>
              <PurchaseButton product={product}/>
            </div>
          </div>
        </div>
      </QueryComponent>
    </>
  );
};