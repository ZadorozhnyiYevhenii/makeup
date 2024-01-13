import { gql } from "@apollo/client";

export interface MutationDeleteBrand {
  brandId: number;
}

export const DELETE_BRAND = gql`
  mutation MyMutation($brandId: Long!) {
    deleteBrand(brandId: $brandId)
  }
`;