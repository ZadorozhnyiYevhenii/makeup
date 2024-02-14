import { useEffect, useState } from 'react';
import { useDisableScroll } from '../../../hooks/useDisableScroll';
import { HeaderBar } from '../HeaderBar/HeaderBar';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES } from '../../../graphql/queries/getAll/getAllCategories';
import { ICategory } from '../../../types/ICategory';
import { NavBar } from '../../NavBarComponents/NavBar/NavBar';
import { useKeyDown } from '../../../hooks/useKeyDown';
import './Header.scss';

interface QueryData {
  getAllCategories: ICategory[];
}

export const Header = () => {
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

      const scrollUp = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      };

      if (!isMenuOpen) {
        scrollUp();
      }
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
    },
  };

  useKeyDown('Escape', close.search);

  useKeyDown('Escape', close.login);

  useDisableScroll('no-scroll', isMenuOpen);

  const { data: category, error, loading } = useQuery<QueryData>(GET_ALL_CATEGORIES);

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__upperContent">
          Worldwide Free Shipping!
        </div>
      </div>
      <HeaderBar
        isLoginOpen={isLoginOpen}
        isMenuOpen={isMenuOpen}
        isSearchOpen={isSearchOpen}
        onLoginClose={close.login}
        onSearchClose={close.search}
        onMenuClose={close.menu}
        onLoginOpen={toggle.login}
        onMenuOpen={toggle.menu}
        onSearchOpen={toggle.search}
      />
      <NavBar
        isLoginOpen={isLoginOpen}
        isMenuOpen={isMenuOpen}
        isSearchOpen={isSearchOpen}
        onCloseMenu={close.menu}
        categories={category?.getAllCategories}
        loading={loading}
        error={error}
      />
    </header>
  );
};