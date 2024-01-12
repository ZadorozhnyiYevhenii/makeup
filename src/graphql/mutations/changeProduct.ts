import { gql } from "@apollo/client";
import { IProd } from "../../types/IProduct";

export interface MutationChangeProduct {
  productId: number;
  updateProduct: IProd;
};

export const CHANGE_PRODUCT = gql`
  mutation MyMutation($productId: Long!, $updatedProduct: NewProduct!) {
    updateProduct(productId: $productId, updatedProduct: $updatedProduct) {
      additionalInfo
      brand {
        id
        name
      }
      categories {
        id
        name
        parentCategoryId
      }
      classification
      countriesMadeIn {
        id
        name
      }
      countryTradeMark {
        id
        name
      }
      id
      description
      images {
        id
        imageLink
      }
      name
      productGroup
      productStatus
      sex
    }
  }
`;