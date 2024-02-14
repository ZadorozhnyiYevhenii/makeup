import { gql } from "@apollo/client";
import { IOrder } from "../../../types/IOrder";
import { IUser } from "../../../types/IUser";

export interface MutationAddOrder {
  addOrder: IOrder | IUser;
};

export const ADD_ORDER_NEW_USER = gql`
mutation MyMutation($newShippingInfo: NewShippingInfo!, $orderDetailsInfo: [NewOrderDetails]!, $orderInfo: NewOrder!) {
  addOrder(
    newShippingInfo: $newShippingInfo,
    orderDetailsInfo: $orderDetailsInfo,
    orderInfo: $orderInfo,
  ) {
    created
    paymentMethod
    id
    orderDetails {
      id
      quantity
      totalDetailPrice
      variationDetails {
        id
        sale
        price
        shippingFrom
      }
    }
    orderStatus
    shippingInfo {
      city
      house
      id
      recipientFirstName
      recipientPhoneNumber
      recipientLastName
      region
      street
    }
    sum
    updated
    user {
      birthdayDate
      email
      enabled
      firstName
      id
      isEmailVerified
      lastName
      password
      shippingInfos {
        street
        region
        recipientPhoneNumber
        recipientLastName
        recipientFirstName
        id
        house
        city
      }
      userRole
      phoneNumber
    }
  }
}
`;