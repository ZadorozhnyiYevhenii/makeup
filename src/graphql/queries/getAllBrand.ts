import { gql } from "@apollo/client";
import { IProd } from "../../types/IProduct";

export interface QueryAllBrands {
  getAllBrands: IProd[]
}

export const GET_ALL_BRANDS = gql`
  query MyQuery {
    getAllBrands {
      name
      id
    }
  }
`;