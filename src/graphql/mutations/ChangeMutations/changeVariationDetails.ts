import { gql } from "@apollo/client";
import { IProd } from "../../../types/IProduct";

export interface MutationChangeVariationDetails {
  variationDetailsId: number;
  updatedVariationDetails: IProd
}

export const CHANGE_VARIATION_DETAILS = gql`
  mutation MyMutation($variationDetailsId: Long!, $updatedVariationDetails: NewVariationDetails!) {
    updateVariationDetails(variationDetailsId: $variationDetailsId, updatedVariationDetails: $updatedVariationDetails) {
      id
      sale
      shippingFrom
      price
    }
  }
`