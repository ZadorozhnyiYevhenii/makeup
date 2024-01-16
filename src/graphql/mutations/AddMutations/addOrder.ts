import { gql } from "@apollo/client";
import { IOrder } from "../../../types/IOrder";
import { IUser } from "../../../types/IUser";

export interface MutationAddOrder {
  addOrder: IOrder | IUser;
};

export const ADD_ORDER = gql`
  mutation MyMutation($address: NewAddress!, $orderInfo: NewOrder!) {
    addOrder(address: $address, orderInfo: $orderInfo) {
      id
    }
  }
`;