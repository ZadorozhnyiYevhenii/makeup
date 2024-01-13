import { gql } from "@apollo/client";
import { IProd } from "../../../types/IProduct";

export interface MutationAddProductVariation {
  addProductVariation: IProd;
}

export const ADD_PRODUCT_VARIATIONS = gql`
  mutation MyMutation($productVariation: NewProductVariation!) {
    addProductVariation(productVariation: $productVariation) {
      variationName
      id
      variationDetails {
        id
        price
        sale
        shippingFrom
      }
      variationImage {
        id
        imageLink
      }
    }
  }
`;