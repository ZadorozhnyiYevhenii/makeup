import { gql } from "@apollo/client";

export interface MutationDeleteCategory {
  categoryId: number;
}

export const DELETE_CATEGORY = gql`
  mutation MyMutation($categoryId: Long!) {
    deleteCategory(categoryId: $categoryId)
  }
`;