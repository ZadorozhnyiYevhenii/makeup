import { gql } from "@apollo/client";

export interface QueryGetAllPaymentMethods {
  getAllPaymentMethods: string[];
};

export const GET_ALL_PAYMENT_METHODS = gql`
  query MyQuery {
    getAllPaymentMethods
  }
`;