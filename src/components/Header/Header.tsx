import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import cn from 'classnames';
import { Logo } from '../../Logo/Logo';
import { Menu } from '../../assets/Menu';
import { SearchIconHeader } from '../../assets/SearchIcon';
import { AccountIcon } from '../../assets/AccountIcon';
import { CartIcon } from '../../assets/CartIcon';
import { CrossIcon } from '../../assets/CrossIcon';
import { SearchBar } from '../Search/Search';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(prevOpen => !prevOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prevOpen => !prevOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__upperContent">
          Worldwide Free Shipping!
        </div>
      </div>
      <div className="header__wrap">
        <div className="header__left">
          {isMenuOpen ? (
            <div
              className="header__menu"
              onClick={closeMenu}
            >
              <CrossIcon />
            </div>
          ) : (
            <div
              className="header__menu"
              onClick={toggleMenu}
            >
              <Menu />
            </div>
          )}
          <div
            className="header__search"
            onClick={toggleSearch}
          >
            <SearchIconHeader />
          </div>
          {isSearchOpen &&
            <>
            <div className="header__searchBackdrop" onClick={closeSearch}></div>
            <div className="header__searchBar">
              <SearchBar onCross={closeSearch} />
            </div>
          </>
          }
        </div>
        <Link className="header__logo" to="/makeup">
          <Logo />
        </Link>
        <div className="header__right">
          <div
            className="header__account"
          >
            <AccountIcon />
          </div>
          <NavLink
            to="/makeup/cart"
            className="header__cart"
          >
            <CartIcon />
          </NavLink>
        </div>
      </div>
      <div className={cn('header__navbar-mobile', {
        show: isMenuOpen,
        'show-menu': isMenuOpen,
        'close-menu': !isMenuOpen,
      })}
      >
        <div className='header__navbar-mobile__container'>
          <div className="header__navbar-mobile__content">
            <NavLink to="" className="header__navbar-mobile__item header__navbar-mobile__item--alarm">
              Sales
            </NavLink>
            <NavLink to="" className="header__navbar-mobile__item">
              MAKEUP Club
            </NavLink>
            <NavLink to="" className="header__navbar-mobile__item">
              Fragrancies
            </NavLink>
            <NavLink to="" className="header__navbar-mobile__item">
              Makeup
            </NavLink>
            <NavLink to="" className="header__navbar-mobile__item">
              Hair
            </NavLink>
            <NavLink to="" className="header__navbar-mobile__item">
              Face
            </NavLink>
            <NavLink to="" className="header__navbar-mobile__item">
              Body and bath
            </NavLink>
            <NavLink to="" className="header__navbar-mobile__item">
              Men`s
            </NavLink>
            <NavLink to="" className="header__navbar-mobile__item">
              Gifts
            </NavLink>
            <NavLink to="" className="header__navbar-mobile__item">
              Brands
            </NavLink>
          </div>
          <div className="header__navbar-mobile__footer">
            <NavLink to="" className="header__navbar-mobile__util">
              Favorites
            </NavLink>
            <NavLink to="" className="header__navbar-mobile__util">
              Beauty club
            </NavLink>
          </div>
        </div>
      </div>
      <nav className={cn('header__nav', {
        'header__nav--none': isSearchOpen
      })}>
        <ul className={cn('header__list', {
          'header__list--not': isSearchOpen,
        })}>
          <li className='header__item'>
            <NavLink to="" className="header__link">
              Fragrancies
            </NavLink>
            <div className="header__submenu">
              <ul>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 1</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
              </ul>
            </div>
          </li>
          <li className='header__item'>
            <NavLink to="" className="header__link">
              Makeup
            </NavLink>
            <div className="header__submenu">
              <ul className='header__subList'>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 1</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 1</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
                <li><NavLink to="" className="header__submenu-link">Submenu Item 2</NavLink></li>
              </ul>
            </div>
          </li>
          <li className='header__item'>
            <NavLink to="" className="header__link">
              Hair
            </NavLink>
          </li>
          <li className='header__item'>
            <NavLink to="" className="header__link">
              Face
            </NavLink>
          </li>
          <li className='header__item'>
            <NavLink to="" className="header__link">
              Body and bath
            </NavLink>
          </li>
          <li className='header__item'>
            <NavLink to="" className="header__link">
              Men`s
            </NavLink>
          </li>
          <li className='header__item'>
            <NavLink to="" className="header__link">
              Gifts
            </NavLink>
          </li>
          <li className='header__item'>
            <NavLink to="" className="header__link">
              Brands
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};