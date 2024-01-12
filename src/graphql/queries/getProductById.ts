import { gql } from "@apollo/client";

export const GET_PRODUCT_BYID = gql`
  query MyQuery($id: Long!) {
    getProductById(id: $id) {
        id
        name
        productGroup
        brand {
          name
        }
        images {
          id
          imageLink
        }
        productVariations {
        variationName
        variationDetails {
          price
        }
      }
      }
    }
`;