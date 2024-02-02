import { gql } from "@apollo/client";
import { IProd } from "../../../types/IProduct";

export interface QuerySearchProducts {
  searchProductsPaged: {
    content: IProd[],
    total: number;
  }
}

export const SEARCH_PRODUCTS = gql`
  query MyQuery($pageRequestDTO: PageRequestDTO!, $searchString: String!) {
    searchProductsPaged(pageRequestDTO: $pageRequestDTO, searchString: $searchString) {
      content {
        brand {
          id
          name
        }
        categories {
          id
          name
        }
        id
        name
        productGroup
        productVariations {
          id
          variationDetails {
            shippingFrom
            sale
            price
            id
          }
          variationImage {
            imageLink
            id
          }
          variationName
        }
      }
      total
    }
  }
`;