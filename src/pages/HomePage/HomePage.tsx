import React from "react";
import { SliderMain } from "../../components/SliderMain/SLiderMain";
import { ProductSlider } from "../../components/ProductSlider/ProductSlider";
import { titles } from "../../utils/titles";
import './HomePage.scss';


export const HomePage: React.FC = () => {
  return (
    <div className="homePage">
      <SliderMain />
      <ProductSlider title={titles.BRAND_OFFER} />
    </div>
  )
};