import { gql } from "@apollo/client";

export const GET_PRODUCTS_ID = gql`
  query MyQuery {
    getAllProducts {
      id,
    }
  }
`;