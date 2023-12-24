import { IProd } from "../types/IProduct";

export const calculateTotalProductsCount = (
  products: IProd[],
  brands: string[],
  types: string[]
): number => {
  if (brands.length === 0 && types.length === 0) {
    return products.length;
  }

  const filteredProducts = products.filter(product => {
    return (
      (brands.length === 0 || brands.includes(product.brand)) &&
      (types.length === 0 || types.includes(product.type))
    );
  });

  const uniqueProductsCount = new Set(filteredProducts.map(product => product.id)).size;

  return uniqueProductsCount;
};
