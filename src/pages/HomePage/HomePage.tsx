import React from "react";
import { SliderMain } from "../../components/SliderMain/SLiderMain";
import { ProductSlider } from "../../components/ProductComponents/ProductSlider/ProductSlider";
import { Titles } from "../../utils/titles";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_ID, QueryGetProductsiId } from "../../graphql/queries/getById/getProductsID";
import { IProd } from "../../types/IProduct";
import { getProductsForSlider } from "../../helpers/getProductsForSlider";
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const { data, error, loading } = useQuery<QueryGetProductsiId>(GET_PRODUCTS_ID);
  const products: IProd[] | undefined = data?.getAllProducts ?? [];

  const productsByGroup = getProductsForSlider(products, 'productGroup', 'Parfum water')

  return (
    <div className="homePage">
      <SliderMain />
      <ProductSlider
        title={Titles.PARFUME_WATER}
        products={productsByGroup}
        error={error}
        loading={loading}
      />
    </div>
  )
};