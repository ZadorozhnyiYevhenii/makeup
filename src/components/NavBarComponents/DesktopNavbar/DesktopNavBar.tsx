import { FC } from "react";
import { NavLink } from "react-router-dom";
import cn from 'classnames';
import './DesktopNavbar.scss';
import { ICategory } from "../../../types/ICategory";
import { ApolloError } from "@apollo/client";
import { QueryComponent } from "../../QueryComponent/QueryComponent";
import { DesktopNavBarChildrenCategories } from "../NavBarChildrenCategories/NavBarChildrenCategories";

type Props = {
  isSearchOpen: boolean,
  isLoginOpen: boolean,
  categories: ICategory[] | undefined,
  error: ApolloError | undefined,
  loading: boolean,
}

export const DesktopNavbar: FC<Props> = ({
  isSearchOpen,
  isLoginOpen,
  categories,
  error,
  loading,
}) => {
  const topLevelCategories = categories?.filter(cat => cat.parentCategoryId === null) || [];
  return (
    <nav className={cn('nav', {
      'nav--none': isSearchOpen
    })}>
      <ul className={cn('nav__list', {
        'nav__list--not': isSearchOpen,
        'nav__list--logged': isLoginOpen,
      })}>
        <QueryComponent error={error} isLoading={loading} errorMessage="categories">
          {topLevelCategories?.map(({ name, id }) => (
            <li className='nav__item' key={id}>
              <NavLink
                to={`makeup/category/${id}`}
                className="nav__link"
              >
                {name}
              </NavLink>
              <DesktopNavBarChildrenCategories id={id} />
            </li>
          ))}
        </QueryComponent>
      </ul>
    </nav>
  )
}