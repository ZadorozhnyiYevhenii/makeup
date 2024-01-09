import { gql } from "@apollo/client";
import { IProd } from "../../types/IProduct";

export interface MutationAddImage {
  addImageToProduct: IProd;
}

export const ADD_IMAGE_TO_PRODUCT = gql`
  mutation MyMutation($imageLink: String!, $productId: Long!) {
    addImageToProduct(imageLink: $imageLink, productId: $productId) {
      id
      name
    }
  }
`;