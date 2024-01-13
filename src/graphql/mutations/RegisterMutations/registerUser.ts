import { gql } from "@apollo/client";

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($request: RegisterRequest!) {
    registerUser(request: $request) {
      jwtToken
    }
  }
`;