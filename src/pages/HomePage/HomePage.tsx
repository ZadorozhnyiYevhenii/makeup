import React from "react";
import { SliderMain } from "../../components/SliderMain/SLiderMain";
import { ProductSlider } from "../../components/ProductSlider/ProductSlider";
import { titles } from "../../utils/titles";


export const HomePage: React.FC = () => {
  return (
    <>
      <SliderMain />
      <ProductSlider title={titles.BRAND_OFFER} />
    </>
  )
};