import { IProd } from "../types/IProduct";

type ProductCount = Record<string, number>;

export const calculateProductCountByFilter = (
  productsArray: IProd[] | undefined,
  selectedBrands: string[],
  selectedTypes: string[],
  selectedSex: string[]
): ProductCount => {
  const productCount: ProductCount = {};

  productsArray?.forEach((product) => {
    const brand = product.brand.name as string;
    const type = product.classification as string;
    const sex = product.sex as string;

    const matchesSelectedBrands =
      selectedBrands.length === 0 || selectedBrands.includes(brand);

    const matchesSelectedTypes =
      selectedTypes.length === 0 || selectedTypes.includes(type);

    const mathedSelectedSex = 
      selectedSex.length === 0 || selectedSex.includes(sex)

    if (matchesSelectedBrands && matchesSelectedTypes && mathedSelectedSex) {
      productCount[brand] = (productCount[brand] || 0) + 1;
      productCount[type] = (productCount[type] || 0) + 1;
      productCount[sex] = (productCount[sex] || 0) + 1;
    }
  });

  return productCount;
};
