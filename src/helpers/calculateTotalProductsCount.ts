import { IProd } from "../types/IProduct";

export const calculateTotalProductsCount = (
  products: IProd[] | undefined,
  brands: string[],
  types: string[],
  sex: string[]
): number | undefined => {
  if (brands.length === 0 && types.length === 0) {
    return products?.length;
  }

  const filteredProducts = products?.filter(product => {
    return (
      (brands.length === 0 || brands.includes(product.brand.name)) &&
      (types.length === 0 || types.includes(product.classification)) &&
      (sex.length === 0 || sex.includes(product.sex))
    );
  });

  const uniqueProductsCount = new Set(filteredProducts?.map(product => product.id)).size;

  return uniqueProductsCount;
};
