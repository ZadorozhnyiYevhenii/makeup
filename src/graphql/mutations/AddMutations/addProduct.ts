import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation MyMutation($product: NewProduct!) {
    addProduct(product: $product) {
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
        id
        name
      }
      countryTradeMark {
        id
        name
      }
      description
      productGroup
      id
      images {
        id
        imageLink
      }
      name
      productStatus
      sex
    }
  }
`;