import React, { memo, useEffect, useState } from 'react';
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
import { LoginForm } from '../Login/LoginForm';

export const Header: React.FC = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggle = {
    login: () => {
      setIsLoginOpen(prevopen => !prevopen);
    },
    search: () => {
      setIsSearchOpen(prevOpen => !prevOpen);
    },
    menu: () => {
      setIsMenuOpen(prevOpen => !prevOpen);
    }
  };

  const close = {
    search: () => {
      setIsSearchOpen(false);
    },

    login: () => {
      setIsLoginOpen(false);
    },

    menu: () => {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);


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
              onClick={close.menu}
            >
              <CrossIcon />
            </div>
          ) : (
            <div
              className="header__menu"
              onClick={toggle.menu}
            >
              <Menu />
            </div>
          )}
          <div
            className="header__search"
            onClick={toggle.search}
          >
            <SearchIconHeader />
          </div>
          {isSearchOpen &&
            <>
              <div className="header__searchBackdrop" onClick={close.search}></div>
              <div className="header__searchBar">
                <SearchBar onCross={close.search} />
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
            onClick={toggle.login}
          >
            <AccountIcon />
          </div>
          {isLoginOpen && (
            <>
              <div className="header__login-overlay" onClick={close.login}></div>
              <div className="header__login">
                <LoginForm onClose={close.login} />
              </div>
            </>
          )}
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
          'header__list--logged': isLoginOpen,
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
});