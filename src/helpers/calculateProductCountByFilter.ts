import { IProd } from "../types/IProduct";

type ProductCount = Record<string, number>;

export const calculateProductCountByFilter = (
  productsArray: IProd[],
  selectedBrands: string[],
  selectedTypes: string[]
): ProductCount => {
  const productCount: ProductCount = {};

  productsArray.forEach((product) => {
    const brand = product.brand as string;
    const type = product.productType as string;

    const matchesSelectedBrands =
      selectedBrands.length === 0 || selectedBrands.includes(brand);

    const matchesSelectedTypes =
      selectedTypes.length === 0 || selectedTypes.includes(type);

    if (matchesSelectedBrands && matchesSelectedTypes) {
      productCount[brand] = (productCount[brand] || 0) + 1;
      productCount[type] = (productCount[type] || 0) + 1;
    }
  });

  return productCount;
};
