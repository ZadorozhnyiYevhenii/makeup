import { gql } from "@apollo/client";
import { IProd } from "../../types/IProduct";

export interface QueryGetAllProducts {
  getAllProducts: IProd[]
}

export const GET_ALL_PRODUCTS = gql`
  query MyQuery {
    getAllProducts {
      id
      isLiquid
      name
      productGroup
      productStatus
      sex
      productVariations {
        amount
        id
        variationDetails {
          id
          price
          sale
          shippingFrom
        }
        variationImage {
          imageLink
          id
        }
      }
      images {
        id
        imageLink
      }
      description
      countryTradeMark {
        id
        name
      }
      classification
      brand {
        id
        name
      }
      additionalInfo
      categories {
        id
        name
        parentCategoryId
      }
      countriesMadeIn {
        id
        name
      }
    }
  }
`;