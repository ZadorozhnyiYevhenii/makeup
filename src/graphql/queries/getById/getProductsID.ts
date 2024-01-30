import { gql } from "@apollo/client";
import { IProd } from "../../../types/IProduct";

export interface QueryGetProductsiId {
getAllProducts: IProd[]
}

export const GET_PRODUCTS_ID = gql`
  query MyQuery {
    getAllProducts {
      id
      brand {
        name
        id
      }
      classification
      productGroup
    }
  }
`;