import { gql } from "@apollo/client";

export interface QueryProductStatus {
  getAllProductStatuses: string[];
};

export const GET_PRODUCT_STATUS = gql`
  query MyQuery {
    getAllProductStatuses
  }
`;