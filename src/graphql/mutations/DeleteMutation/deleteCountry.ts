import { gql } from "@apollo/client";

export interface MutationDeleteCountry {
  countryId: number;
};

export const DELETE_COUNTRY = gql`
  mutation MyMutation($countryId: Long!) {
    deleteCountry(countryId: $countryId)
  }
`;