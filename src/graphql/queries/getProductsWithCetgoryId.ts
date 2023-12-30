import { gql } from "@apollo/client";

export const GET_PRODUCT_WITH_CATEGORY_ID = gql`
query MyQuery($categoryIds: [Long]!) {
  getProductsByCategoryIds(categoryIds: $categoryIds) {
    id
    productStatus
    name
    categories {
      name
      id
    }
    classification
    brand {
      id
      name
    }
    sex
  }
}
`