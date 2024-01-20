import { gql } from "@apollo/client";
import { ICategory } from "../../../types/ICategory";

export interface QueryGetCategoriesByParentCategoryId {
  getCategoriesByCategoryParentId: ICategory[] | undefined;
};

export const GET_CATEGORIES_BY_PARENT_CATEGORYID = gql`
  query MyQuery($parentCategoryId: Long!) {
    getCategoriesByCategoryParentId(parentCategoryId: $parentCategoryId) {
      id
      name
      parentCategoryId
    }
  }
`;