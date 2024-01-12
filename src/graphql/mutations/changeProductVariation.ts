import { gql } from "@apollo/client";
import { IProd } from "../../types/IProduct";

export interface MutationChangeProductVariation {
  productVariationId: number;
  updatedProductVariation: IProd
}

export const CHANGE_PRODUCT_VARIATION = gql`
  mutation MyMutation($productVariationId: Long!, $updatedProductVariation: NewProductVariation!) {
    updateProductVariation(productVariationId: $productVariationId, updatedProductVariation: $updatedProductVariation) {
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