import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import './ProductSlider.scss';

export const ProductSlider: React.FC = () => {
  return (
    <div className="productSlider">
      <ul className="productSlider__list">
      <li className="productSlider__item">
        <ProductCard />
      </li>
      <li className="productSlider__item">
        <ProductCard />
      </li>
      <li className="productSlider__item">
        <ProductCard />
      </li>
      <li className="productSlider__item">
        <ProductCard />
      </li>
      <li className="productSlider__item">
        <ProductCard />
      </li>
      <li className="productSlider__item">
        <ProductCard />
      </li>
      <li className="productSlider__item">
        <ProductCard />
      </li>
      <li className="productSlider__item">
        <ProductCard />
      </li>
      <li className="productSlider__item">
        <ProductCard />
      </li>
      <li className="productSlider__item">
        <ProductCard />
      </li>
    </ul>
    </div>
  )
}