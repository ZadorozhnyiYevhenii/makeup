import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query MyQuery {
    getAllProducts {
      brand {
        id
        name
      }
      categories {
        id
        name
      }
      classification
      countriesMadeIn {
        name
        id
      }
      isLiquid
      name
      productStatus
      productVariations {
        variationDetails {
          id
          price
        }
        amount
        id
      }
      sex
      id
      countryTradeMark {
        id
        name
      }
      images {
        imageLink
        id
      }
    }
  }
`;