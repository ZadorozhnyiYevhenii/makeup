import { gql } from "@apollo/client";
import { IProd } from "../../../types/IProduct";

export interface MutationAddCountry {
  addCountry: IProd
}

export const ADD_COUNTRY = gql`
  mutation MyMutation($countryName: String!) {
    addCountry(countryName: $countryName) {
      id
      name
    }
  }
`;