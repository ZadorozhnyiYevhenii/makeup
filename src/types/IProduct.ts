import { IClassification } from './IClassification';

export interface IProd {
  id: number;
  name: string;
  type: string;
  sex: string;
  description?: string;
  classification: typeof IClassification;
  countriesMadeIn: string[];
  isLiquid: boolean;
  productStatus: string;
  brandId: number;
  categoryIds: number[];
  countryTradeMarkId: number;
  countriesMadeInIds: number[];
  imageLink: string;
  imageLinks: string[];
  productGroup: string;
  productVariationId: number;
  price: number;
  shippingFrom: string;
  sale: number;
  variationId: number;
  images: {
    imageLink: string;
    id: number;
  }[];
  productVariations: Array<{
    variationDetails: Array<{
      id: number;
      price: number;
    }>;
    amount: number;
    id: number;
  }>;
  brand: {
    name: string;
    id: number
  };
  categories: Array<{
    id: number;
    name: string;
  }>;
  countryTradeMark: {
    id: number,
    name: string
  };
  brandName: string;
  countryName: string;
  amount: number;
  productId: number;
};
