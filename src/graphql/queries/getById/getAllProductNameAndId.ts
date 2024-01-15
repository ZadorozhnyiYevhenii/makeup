import { gql } from "@apollo/client";
import { IProd } from "../../../types/IProduct";

export interface QueryGetAllProductsIdName {
  getAllProducts: IProd[];
}

export const GET_ALL_PRODUCTS_ID_NAME = gql`
  query MyQuery {
    getAllProducts {
      id
      name
      productVariations {
        id
        variationName
        variationImage {
          imageLink
          id
        }
        variationDetails {
          id
          price
          sale
          shippingFrom
        }
      }
    }
  }
`;