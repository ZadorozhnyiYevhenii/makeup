import { gql } from "@apollo/client";
import { IOrderDetails } from "../../../types/IOrderDetails";

export interface MutationAddOrderDetails {
  addOrderDetails: IOrderDetails;
};

export const ADD_ORDER_DETAILS = gql`
  mutation MyMutation($orderDetails: NewOrderDetails!) {
    addOrderDetails(orderDetails: $orderDetails) {
      id
    }
  }
`;