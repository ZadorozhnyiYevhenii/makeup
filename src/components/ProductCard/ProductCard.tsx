import React, { useState } from "react";
import './ProductCard.scss';
import { ScrollTopLink } from "../../helpers/scrollTopLink";
import { PurchaseButton } from "../PurchaseButton/PurchaseButton";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BYID } from "../../graphql/queries/getProductById";
import { QueryComponent } from "../QueryComponent/QueryComponent";
import { IProd } from "../../types/IProduct";
import { SelectMenu } from "../SelectMenu/SelectMenu";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../app/slices/cartSlice";

type Props = {
  id: number,
}

export const ProductCard: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery<{ getProductById: IProd }>(
    GET_PRODUCT_BYID,
    { variables: { id: String(id) } }
  );

  const product: IProd | undefined = data?.getProductById;

  const defaultSelectedAmount = product?.productVariations[0]?.amount;
  const defaultSelectedVariation = product?.productVariations[0];
  const defaultPrice = defaultSelectedVariation?.variationDetails[0]?.price;

  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(defaultSelectedAmount);

  if (!product) {
    return null;
  }

  const selectedVariation = product.productVariations.find(
    (variation) => variation?.amount === selectedAmount
  );

  const price = selectedVariation?.variationDetails[0]?.price || defaultPrice;
  const quantity = selectedAmount || defaultSelectedAmount;

  const handleAddToCart = () => {
    const productWithVariations = {
      ...product,
      price: price || 0,
      amount: quantity || 0,
    };

    dispatch(addToCart(productWithVariations));
  }

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
              <h2 className="card__group">{product.productGroup}</h2>
            </div>
            <div className="card__bottom">
              <div className="card__rate">{quantity} ml</div>
              <div className="card__price">{price} $</div>
            </div>
          </div>
          <div className="card__purchase-button">
            <SelectMenu product={product} setSelectedAmount={setSelectedAmount} /> 
            <PurchaseButton product={product} addToCart={handleAddToCart} />
          </div>
        </div>
      </QueryComponent>
    </>
  );
};