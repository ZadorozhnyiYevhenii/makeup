import { NavLink } from "react-router-dom";
import { FC } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES_BY_PARENT_CATEGORYID, QueryGetCategoriesByParentCategoryId } from "../../../graphql/queries/getById/getCategoriesByParentCategoryId";

type Props = {
  id: number;
}

export const MobileNavBarChildrenCategories: FC<Props> = ({ id }) => {
  const { data } = useQuery<QueryGetCategoriesByParentCategoryId>(GET_CATEGORIES_BY_PARENT_CATEGORYID, {
    variables: {
      parentCategoryId: id,
    },
  });

  const childrenCategories = data?.getCategoriesByCategoryParentId;

  return (
    <div className="nav__submenu">
      <ul className="nav__submenu-container">
        {childrenCategories
          ?.filter(cat => cat.parentCategoryId === id)
          .map(filteredCat => (
            <li key={filteredCat.id}>
              <NavLink to={`makeup/category/${filteredCat.id}`} className="nav__submenu-link">
                {filteredCat.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  )
}