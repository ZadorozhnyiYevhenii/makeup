import { gql } from "@apollo/client";
import { IProd } from "../../types/IProduct";

export interface MutationAddVariationDetails {
  addVariationDetails: IProd;
}

export const ADD_VARIATION_DETAILS = gql`
  mutation MyMutation($variationDetails: NewVariationDetails!) {
    addVariationDetails(variationDetails: $variationDetails) {
      id
      price
      shippingFrom
      sale
    }
  }
`;