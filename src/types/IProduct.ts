export interface IProd {
  id: number;
  name: string;
  type: string;
  quantity: number;
  price: string;
  img: string[];
  country?: string;
  sex?: string;
  productType?: string;
  smellType?: string;
  начальнаяНота?: string; // Add the appropriate types for these properties
  нотаСердца?: string; // Add the appropriate types for these properties
  конечнаяНота?: string; // Add the appropriate types for these properties
  value?: string;
  code?: string;
  description?: string;
}