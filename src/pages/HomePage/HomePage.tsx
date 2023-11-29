import React from "react";
import { SliderMain } from "../../components/SliderMain/SLiderMain";
import { ProductSlider } from "../../components/ProductSlider/ProductSlider";


export const HomePage: React.FC = () => {
  return (
    <>
      <SliderMain />
      <ProductSlider />
    </>
  )
};