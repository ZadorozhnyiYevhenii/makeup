import { gql } from "@apollo/client";

export const GET_PRODUCT_VARIATION_BY_ID = gql`
  query MyQuery($productId: Long!) {
    getProductVariationsByProductId(productId: $productId) {
      id
      variationImage {
        id
        imageLink
      }
      variationName
    }
  }
`