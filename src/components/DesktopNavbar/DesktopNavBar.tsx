import { FC } from "react";
import { NavLink } from "react-router-dom";
import cn from 'classnames';
import './DesktopNavbar.scss';
import { ICategory } from "../../types/ICategory";
import { ApolloError } from "@apollo/client";
import { QueryComponent } from "../QueryComponent/QueryComponent";

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
  loading
}) => {
  return (
    <nav className={cn('nav', {
      'nav--none': isSearchOpen
    })}>
      <ul className={cn('nav__list', {
        'nav__list--not': isSearchOpen,
        'nav__list--logged': isLoginOpen,
      })}>
        <QueryComponent error={error} isLoading={loading} errorMessage="categories">
          {categories?.map(({ name, id }) => (
            <li className='nav__item' key={id}>
              <NavLink
                to={`makeup/category/${id}`}
                className="nav__link"
              >
                {name}
              </NavLink>
              <div className="nav__submenu">
                <ul>
                  <li><NavLink to="" className="nav__submenu-link">Submenu Item 1</NavLink></li>
                  <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
                </ul>
              </div>
            </li>
          ))}
        </QueryComponent>
      </ul>
    </nav>
  )
}