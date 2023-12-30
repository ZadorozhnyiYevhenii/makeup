export interface IProd {
  id: number;
  name: string;
  type: string;
  sex: string;
  description?: string;
  classification: string;
  countriesMadeIn: string[];
  isLiquid: boolean;
  productStatus: string;
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
  }
};
