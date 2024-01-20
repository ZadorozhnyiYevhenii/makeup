import { FC, Suspense, lazy } from "react";
import { SortOptions } from "../../../utils/sortOptions";
import { filterAndSortProducts } from "../../../utils/filterAndSortProducts";
import { IProd } from "../../../types/IProduct";
import { Loader } from "../../Loader/Loader";
import './ProductCardList.scss';

const LazyProductCard = lazy(() => 
  import("../ProductCard/ProductCard").then((module) => ({ default: module.ProductCard }))
);

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
            <Suspense fallback={<Loader />}>
              <LazyProductCard id={product.id} />
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
  );
};
