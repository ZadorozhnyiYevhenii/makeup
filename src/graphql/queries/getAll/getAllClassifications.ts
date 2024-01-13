import { gql } from "@apollo/client";

export interface QueryAllClassifications {
  getAllClassifications: string[];
}

export const GET_ALL_CLASSIFICATIONS = gql`
  query MyQuery {
    getAllClassifications
  }
`;