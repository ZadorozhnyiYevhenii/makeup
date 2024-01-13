import { gql } from "@apollo/client";
import { IUser } from "../../../types/IUser";

export interface QueryAuth {
  authenticateUser: IUser;
}

export const AUTH_USER = gql`
query MyQuery($request: AuthenticationRequest!) {
  authenticateUser(request: $request) {
    jwtToken
  }
}
`;