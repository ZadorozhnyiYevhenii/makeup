import { gql } from "@apollo/client";
import { IUser } from "../../types/IUser";

export interface QueryUsers {
  getAllUsers: IUser[]
}

export const GET_ALL_USERS = gql`
  query MyQuery {
    getAllUsers {
      email
      id
      lastName
      password
      phoneNumber
      firstName
      birthdayDate
    }
  }
`;