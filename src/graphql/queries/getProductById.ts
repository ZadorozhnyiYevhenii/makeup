import { gql } from "@apollo/client";

export const GET_PRODUCT_BYID = gql`
query MyQuery($id: Long!) {
  getProductById(id: $id) {
      id
      name
      brand {
        name
      }
      images {
        id
        imageLink
      }
      productVariations {
      amount
      variationDetails {
        price
      }
      id
    }
    }
  }
`;