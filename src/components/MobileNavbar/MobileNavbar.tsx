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
  onCloseMenu: () => void,
}

export const MobileNavbar: FC<Props> = ({ categories, loading, error, onCloseMenu }) => {
  return (
    <div className='navbar-mobile'>
      <div className="navbar-mobile__content">
        <NavLink to="makeup/sale" className="navbar-mobile__item navbar-mobile__item--alarm" onClick={onCloseMenu}>
          Sales
        </NavLink>
        <QueryComponent isLoading={loading} error={error} errorMessage="categories">
          {categories?.map(({ name, id }) => (
            <NavLink
              to={`makeup/category/${id}`}
              className="navbar-mobile__item navbar-mobile__item"
              key={id}
              onClick={onCloseMenu} 
            >
              {name}
            </NavLink>
          ))}
        </QueryComponent>
      </div>
      <div className="navbar-mobile__footer">
        <NavLink to="" className="navbar-mobile__util" onClick={onCloseMenu}>
          Favorites
        </NavLink>
        <NavLink to="" className="navbar-mobile__util" onClick={onCloseMenu}>
          Beauty club
        </NavLink>
      </div>
    </div>
  );
};