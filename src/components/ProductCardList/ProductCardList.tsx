import { FC } from "react";
import { SortOptions } from "../../utils/sortOptions";
import { ProductCard } from "../ProductCard/ProductCard"
import './ProductCardList.scss';
import { filterAndSortProducts } from "../../utils/filterAndSortProducts";
import { IProd } from "../../types/IProduct";

type Props = {
  sortOptions: SortOptions | null,
  filteredBrand: string[] | null,
  filteredType: string[] | null,
  filteredSex: string[] | null,
  products: IProd[] | undefined,
}

export const ProductCardList: FC<Props> = ({
  sortOptions,
  filteredBrand,
  filteredType,
  filteredSex,
  products,
}) => {
  const sortedProducts = filterAndSortProducts(products, filteredBrand, filteredType, filteredSex, sortOptions);

  return (
    <div className="productList">
      <ul className="productList__list">
          {sortedProducts?.map(product => (
            <li className="productList__item" key={product.id}>
              <ProductCard id={product.id} />
            </li>
          ))}
      </ul>
    </div>
  );
};
