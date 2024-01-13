import { gql } from "@apollo/client";

export interface MutationDeleteProduct {
  productId: number;
}

export const DELETE_PRODUCT = gql`
  mutation MyMutation($productId: Long!) {
    deleteProduct(productId: $productId)
  }
`;