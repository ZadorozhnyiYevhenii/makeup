import { FC } from "react";
import { NavLink } from "react-router-dom";
import cn from 'classnames';
import './DesktopNavbar.scss';

type Props = {
  isSearchOpen: boolean,
  isLoginOpen: boolean,
}

export const DesktopNavbar:FC<Props> = ({
  isSearchOpen,
  isLoginOpen
}) => {
  return (
    <nav className={cn('nav', {
      'nav--none': isSearchOpen
    })}>
      <ul className={cn('nav__list', {
        'nav__list--not': isSearchOpen,
        'nav__list--logged': isLoginOpen,
      })}>
        <li className='nav__item'>
          <NavLink to="" className="nav__link">
            Fragrancies
          </NavLink>
          <div className="nav__submenu">
            <ul>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 1</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
            </ul>
          </div>
        </li>
        <li className='nav__item'>
          <NavLink to="" className="nav__link">
            Makeup
          </NavLink>
          <div className="nav__submenu">
            <ul className='nav__subList'>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 1</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 1</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
              <li><NavLink to="" className="nav__submenu-link">Submenu Item 2</NavLink></li>
            </ul>
          </div>
        </li>
        <li className='nav__item'>
          <NavLink to="" className="nav__link">
            Hair
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to="" className="nav__link">
            Face
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to="" className="nav__link">
            Body and bath
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to="" className="nav__link">
            Men`s
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to="" className="nav__link">
            Gifts
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to="" className="nav__link">
            Brands
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}