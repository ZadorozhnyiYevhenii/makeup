import { IProd } from "../types/IProduct";
import { SortOptions } from "./sortOptions";

export const filterAndSortProducts = (
  products: IProd[],
  filteredBrand: string[] | null,
  filteredType: string[] | null,
  sortOptions: SortOptions | null,
) => {
  const filteredProducts = products.filter((prod) => 
    (!filteredBrand || filteredBrand.length === 0 || filteredBrand.includes(prod.brand)) &&
    (!filteredType || filteredType.length === 0 || filteredType.includes(prod.productType))
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOptions) {
      case SortOptions.BY_NAME:
        return a.name.localeCompare(b.name);

      case SortOptions.BY_PRICE:
      case SortOptions.ASCENDING:
        return a.price - b.price;

      case SortOptions.DESCENDING:
        return b.price - a.price;

      default:
        return 0;
    }
  });

  return sortedProducts;
}
