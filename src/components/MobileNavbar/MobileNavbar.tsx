import { NavLink } from "react-router-dom";
import './MobileNavBar.scss';
import { ApolloError } from "@apollo/client";
import { ICategory } from "../../types/ICategory";
import { QueryComponent } from "../QueryComponent/QueryComponent";
import { FC } from "react";

type Props = {
  categories: ICategory[] | undefined,
  error: ApolloError | undefined,
  loading: boolean,
}

export const MobileNavbar:FC<Props> = ({ categories, loading, error }) => {
  return (
    <div className='navbar-mobile'>
      <div className="navbar-mobile__content">
        <NavLink to="makeup/sale" className="navbar-mobile__item navbar-mobile__item--alarm">
          Sales
        </NavLink>
        <QueryComponent isLoading={loading} error={error} errorMessage="categories">
          {categories?.map(({ name, id }) => (
            <NavLink
              to={`makeup/category/${id}`}
              className="navbar-mobile__item navbar-mobile__item"
              key={id}
            >
              {name}
            </NavLink>
          ))}
        </QueryComponent>
      </div>
      <div className="navbar-mobile__footer">
        <NavLink to="" className="navbar-mobile__util">
          Favorites
        </NavLink>
        <NavLink to="" className="navbar-mobile__util">
          Beauty club
        </NavLink>
      </div>
    </div>
  );
};