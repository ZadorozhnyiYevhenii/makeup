import { IProd } from "../types/IProduct";

export const getProductsForSlider = (products: IProd[], filterParameter: keyof IProd, filterValue: IProd[keyof IProd]): IProd[] => {
  return products.filter((product) => product[filterParameter] === filterValue);
};