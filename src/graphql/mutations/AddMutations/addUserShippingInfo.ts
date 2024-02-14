import { gql } from "@apollo/client";
import { IOrder } from "../../../types/IOrder";

export interface MutationAddUserShippingInfo {
  addShippingInfoToUser: IOrder
}

export const ADD_USER_SHIPPING_INFO = gql`
  mutation MyMutation($newShippingInfo: NewShippingInfo!, $userId: Long!) {
    addShippingInfoToUser(
      newShippingInfo: $newShippingInfo
      userId: $userId
    ) {
      city
      house
      id
      recipientFirstName
      recipientLastName
      recipientPhoneNumber
      region
      street
    }
  }
`;