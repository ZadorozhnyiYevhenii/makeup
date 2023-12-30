import { FC } from "react";
import { SortOptions } from "../../utils/sortOptions";
import { ProductCard } from "../ProductCard/ProductCard"
import './ProductCardList.scss';
import { filterAndSortProducts } from "../../utils/filterAndSortProducts";
import { IProd } from "../../types/IProduct";
import { ApolloError } from "@apollo/client";
import { QueryComponent } from "../QueryComponent/QueryComponent";

type Props = {
  sortOptions: SortOptions | null,
  filteredBrand: string[] | null,
  filteredType: string[] | null,
  filteredSex: string[] | null,
  products: IProd[] | undefined,
  error: ApolloError | undefined,
  loading: boolean
}

export const ProductCardList: FC<Props> = ({
  sortOptions,
  filteredBrand,
  filteredType,
  filteredSex,
  products,
  error,
  loading
}) => {
  const sortedProducts = filterAndSortProducts(products, filteredBrand, filteredType, filteredSex, sortOptions);

  return (
    <div className="productList">
      <ul className="productList__list">
        <QueryComponent error={error} isLoading={loading} errorMessage="products">
          {sortedProducts?.map(product => (
            <li className="productList__item" key={product.id}>
              <ProductCard id={product.id} />
            </li>
          ))}
        </QueryComponent>
      </ul>
    </div>
  );
};
