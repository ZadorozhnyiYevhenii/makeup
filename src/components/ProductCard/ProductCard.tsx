import React from "react";
import './ProductCard.scss';

export const ProductCard: React.FC = () => {
  return (
    <div className="card">
      <div className="card__wrap">
        <img
          src="https://u.makeup.com.ua/g/gj/gj9mojcjeaga.jpg"
          alt="img"
          className="card__photo"
        />
      </div>
      <div className="card__container">
        <div className="card__content">
          <h2 className="card__name">Burberry My Burberry Black</h2>
          <div className="card__type">fragrancies</div>
        </div>
        <div className="card__bottom">
          <div className="card__rate">50</div>
          <div className="card__price">500$</div>
        </div>
      </div>
    </div>
  );
};