import { gql } from "@apollo/client";
import { IProd } from "../../../types/IProduct";

export interface getAllCountries {
  getAllCountries: IProd[];
}

export const GET_ALL_COUNTRIES = gql`
  query MyQuery {
    getAllCountries {
      name
      id
    }
  }
`;