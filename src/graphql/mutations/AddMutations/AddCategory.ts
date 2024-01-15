import { gql } from "@apollo/client";

export interface MutationAddCategory {
  categoryName: string;
  parentCategoryId: number;
};

export const ADD_CATEGORY = gql`
  mutation MyMutation($categoryName: String!, $parentCategoryId: Long!) {
    addCategory(categoryName: $categoryName, parentCategoryId: $parentCategoryId) {
      id
      name
      parentCategoryId
    }
  }
`;