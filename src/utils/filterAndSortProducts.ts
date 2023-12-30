import { IProd } from "../types/IProduct";
import { SortOptions } from "./sortOptions";

export const filterAndSortProducts = (
  products: IProd[] | undefined,
  filteredBrand: string[] | null,
  filteredType: string[] | null,
  filteredSex: string[] | null,
  sortOptions: SortOptions | null,
) => {

  const getPriceForSorting = (product: IProd) => {
    return product.productVariations.map(variation => variation.variationDetails.map(detail => detail.price)[0])[0];
  };

  const filteredProducts = products?.filter((prod) =>
    (!filteredBrand || filteredBrand.length === 0 || filteredBrand.includes(prod.brand.name)) &&
    (!filteredType || filteredType.length === 0 || filteredType.includes(prod.classification)) &&
    (!filteredSex || filteredSex.length === 0 || filteredSex.includes(prod.sex))
  );

  const sortedProducts =
    filteredProducts ?
      [...filteredProducts].sort((a, b) => {
        switch (sortOptions) {
          case SortOptions.BY_NAME:
            return a.name.localeCompare(b.name);

          case SortOptions.BY_PRICE:
          case SortOptions.ASCENDING:
            return getPriceForSorting(a) - getPriceForSorting(b);

          case SortOptions.DESCENDING:
            return getPriceForSorting(b) - getPriceForSorting(a);

          default:
            return 0;
        }
      })
      : filteredProducts;

  return sortedProducts;
}
