import { FC } from "react";
import { products } from "../../MockProducts"
import { SortOptions } from "../../utils/sortOptions";
import { ProductCard } from "../ProductCard/ProductCard"
import './ProductCardList.scss';

type Props = {
  sortOptions: SortOptions | null,
  filteredBrand: string[] | null,
  filteredType: string[] | null,
}

export const ProductCardList: FC<Props> = ({ sortOptions, filteredBrand, filteredType }) => {
  let sortedProducts = [...products];

  if (filteredBrand && filteredBrand.length > 0) {
    sortedProducts = sortedProducts.filter(product => filteredBrand.includes(product.brand));
  }

  if (filteredType && filteredType.length > 0) {
    sortedProducts = sortedProducts.filter(product => filteredType.includes(product.productType));
  }

  switch (sortOptions) {
    case SortOptions.BY_NAME:
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case SortOptions.BY_PRICE:
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case SortOptions.ASCENDING:
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case SortOptions.DESCENDING:
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return (
    <div className="productList">
      <ul className="productList__list">
        {sortedProducts.map(product => (
          <li className="productList__item" key={product.id}>
            <ProductCard id={product.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
