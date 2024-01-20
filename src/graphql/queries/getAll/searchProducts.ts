import { gql } from "@apollo/client";
import { IProd } from "../../../types/IProduct";

export interface QuerySearchProducts {
  searchProducts: IProd[]
}

export const SEARCH_PRODUCTS = gql`
  query MyQuery($searchString: String!) {
    searchProducts(searchString: $searchString) {
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
      productGroup
      productStatus
      productVariations {
        id
        variationDetails {
          id
          price
          sale
          shippingFrom
        }
        variationImage {
          id
          imageLink
        }
        variationName
      }
      sex
    }
  }
`