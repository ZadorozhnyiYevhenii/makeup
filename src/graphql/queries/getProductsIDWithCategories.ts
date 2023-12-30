import { gql } from "@apollo/client";

export const GET_PRODUCTS_WITH_CATEGORIES = gql`
  query MyQuery {
    getAllProducts {
      brand {
        id
        name
      }
      classification
      id
      productVariations {
        variationDetails {
          price
          id
        }
        id
        amount
      }
      name
      sex
    }
  }
`;