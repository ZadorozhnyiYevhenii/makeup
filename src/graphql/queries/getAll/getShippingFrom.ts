import { gql } from "@apollo/client";

export interface QueryShippingMethods {
  getAllShippingFrom: string[];
};

export const GET_SHIPPING_METHODS = gql`
  query MyQuery {
    getAllShippingFrom
  }
`;