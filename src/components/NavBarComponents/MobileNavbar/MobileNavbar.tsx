import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { ApolloError } from "@apollo/client";
import { ICategory } from "../../../types/ICategory";
import { QueryComponent } from "../../QueryComponent/QueryComponent";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { MobileNavBarChildrenCategories } from "../MobileNavBarChildrenCategories/DesktopNavBarChildrenCategories";
import './MobileNavBar.scss';

type Props = {
  categories: ICategory[] | undefined,
  error: ApolloError | undefined,
  loading: boolean,
  onCloseMenu: () => void,
}

export const MobileNavbar: FC<Props> = ({ categories, loading, error, onCloseMenu }) => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const toggleIcon = (categoryId: number) => {
    setOpenCategory(prev => (prev === categoryId ? null : categoryId));
  }

  const topLevelCategories = categories?.filter(cat => cat.parentCategoryId === null) || [];
  return (
    <div className='navbar-mobile'>
      <div className="navbar-mobile__content">
        <NavLink to="makeup/sale" className="navbar-mobile__item navbar-mobile__item--alarm" onClick={onCloseMenu}>
          Sales
        </NavLink>
        <QueryComponent isLoading={loading} error={error} errorMessage="categories">
          {topLevelCategories?.map(({ name, id }) => (
            <div key={id}>
              <div className="navbar-mobile__container" onClick={() => toggleIcon(id)}>
                <label><ArrowDropDownIcon /></label>
                <NavLink
                  to={`makeup/category/${id}`}
                  className="navbar-mobile__item navbar-mobile__item"
                  key={id}
                  onClick={onCloseMenu}
                >
                  {name}
                </NavLink>
              </div>
              {openCategory === id && (<MobileNavBarChildrenCategories id={id} />)}
            </div>
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
    </div >
  );
};