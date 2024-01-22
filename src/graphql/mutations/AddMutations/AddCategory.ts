import { gql } from "@apollo/client";

export interface MutationAddCategory {
  categoryName: string;
};

export interface MutationAddCategoryWithParentcategory {
  categoryName: string;
  parentCategoryId: number;
}

export const ADD_CATEGORY_WITH_PARENT_CATEGORY_ID = gql`
  mutation MyMutation($categoryName: String!, $parentCategoryId: Long!) {
    addCategory(categoryName: $categoryName, parentCategoryId: $parentCategoryId) {
      id
      name
      parentCategoryId
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation MyMutation($categoryName: String!) {
    addCategory(categoryName: $categoryName) {
      name
      id
    }
  }
`;