import { useQuery } from "@apollo/client";
import { GET_CATEGORIES_BY_PARENT_CATEGORYID, QueryGetCategoriesByParentCategoryId } from "../../../graphql/queries/getById/getCategoriesByParentCategoryId";
import { FC } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  id: number;
}

export const DesktopNavBarChildrenCategories: FC<Props> = ({ id }) => {
  const { data } = useQuery<QueryGetCategoriesByParentCategoryId>(GET_CATEGORIES_BY_PARENT_CATEGORYID, {
    variables: {
      parentCategoryId: id,
    },
  });

  const childrenCategories = data?.getCategoriesByCategoryParentId;

  return (
    <div className="nav__submenu">
      <ul>
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