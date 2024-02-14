import { gql } from "@apollo/client";
import { IUser } from "../../../types/IUser";

export interface QueryUserByJWT {
  getUserByJwtToken: IUser;
};

export const GET_USER_BY_JWT_TOKEN = gql`
  query MyQuery($jwtToken: String!) {
    getUserByJwtToken(jwtToken: $jwtToken) {
      birthdayDate
      email
      enabled
      firstName
      id
      lastName
      isEmailVerified
      password
      phoneNumber
      shippingInfos {
        city
        house
        id
        recipientFirstName
        recipientLastName
        recipientPhoneNumber
        region
        street
      }
      userRole
    }
  }
`;