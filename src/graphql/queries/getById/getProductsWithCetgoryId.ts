import { gql } from "@apollo/client";

export const GET_PRODUCT_WITH_CATEGORY_IDS_PAGED = gql`
  query MyQuery($categoryIds: [Long]!, $pageRequestDTO: PageRequestDTO!) {
    getProductsByCategoryIdsPaged(
      categoryIds: $categoryIds
      pageRequestDTO: $pageRequestDTO
    ) {
      additionalInfo
      brand {
        id
        name
      }
      categories {
        id
        name
        parentCategoryId
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
      id
      images {
        id
        imageLink
      }
      name
      productStatus
    }
  }
`;