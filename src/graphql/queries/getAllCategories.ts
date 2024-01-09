import { gql } from "@apollo/client";
import { IProd } from "../../types/IProduct";

export interface QueryGetAllCategories {
  getAllCategories: IProd[]
}

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;