import { NavLink } from 'react-router-dom';
import './NavBar-mobile.scss';

export const NavbarMobile = () => {
  return (
    <div className="navbar-mobile">
      <div className="navbar-mobile__content">
      <NavLink to="" className="navbar-mobile__item navbar-mobile__item--alarm">
          Sales
        </NavLink>
        <NavLink to="" className="navbar-mobile__item">
          MAKEUP Club
        </NavLink>
        <NavLink to="" className="navbar-mobile__item">
          Fragrancies
        </NavLink>
        <NavLink to="" className="navbar-mobile__item">
          Makeup
        </NavLink>
        <NavLink to="" className="navbar-mobile__item">
          Hair
        </NavLink>
        <NavLink to="" className="navbar-mobile__item">
          Face
        </NavLink>
        <NavLink to="" className="navbar-mobile__item">
          Body and bath
        </NavLink>
        <NavLink to="" className="navbar-mobile__item">
          Men`s
        </NavLink>
        <NavLink to="" className="navbar-mobile__item">
          Gifts
        </NavLink>
        <NavLink to="" className="navbar-mobile__item">
          Brands
        </NavLink>
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
  )
}