import { FC } from "react";
import { products } from "../../MockProducts"
import { SortOptions } from "../../utils/sortOptions";
import { ProductCard } from "../ProductCard/ProductCard"
import './ProductCardList.scss';
import { filterAndSortProducts } from "../../utils/filterAndSortProducts";

type Props = {
  sortOptions: SortOptions | null,
  filteredBrand: string[] | null,
  filteredType: string[] | null,
}

export const ProductCardList: FC<Props> = ({ sortOptions, filteredBrand, filteredType }) => {
  const sortedProducts = filterAndSortProducts(products, filteredBrand, filteredType, sortOptions);

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
