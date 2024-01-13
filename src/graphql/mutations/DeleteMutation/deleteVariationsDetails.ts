import { gql } from "@apollo/client";

export interface MutationsDeleteVariationsDetails {
  variationDetailsId: number;
};

export const DELETE_VARIATIONS_DETAILS = gql`
  mutation MyMutation($variationDetailsId: Long!) {
    deleteVariationDetails(variationDetailsId: $variationDetailsId)
  }
`;