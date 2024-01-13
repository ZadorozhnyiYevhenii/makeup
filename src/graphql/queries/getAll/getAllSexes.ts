import { gql } from "@apollo/client";

export interface QueryAllSexes {
  getAllSexes: string[]
}

export const GET_ALL_SEXES = gql`
  query MyQuery {
    getAllSexes
  }
`;