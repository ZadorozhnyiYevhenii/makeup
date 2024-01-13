import { gql } from "@apollo/client";
import { IProd } from "../../../types/IProduct";

export interface MutationAddBrand {
  addBrand: IProd;
};

export const ADD_BRAND = gql`
  mutation MyMutation($brandName: String!) {
    addBrand(brandName: $brandName) {
      name
      id
    }
  }
`;