import { gql } from "@apollo/client";

export interface MutationDeleteProductVariation {
  productVariationId: number;
}

export const DELETE_PRODUCT_VARIATION = gql`
  mutation MyMutation($productVariationId: Long!) {
    deleteProductVariation(productVariationId: $productVariationId)
  }
`;