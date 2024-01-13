import React, { memo, useState } from 'react';
import './Header.scss';
import { useDisableScroll } from '../../hooks/useDisableScroll';
import { HeaderBar } from '../HeaderBar/HeaderBar';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES } from '../../graphql/queries/getAll/getAllCategories';
import { ICategory } from '../../types/ICategory';
import { NavBar } from '../NavBar/NavBar';

interface QueryData {
  getAllCategories: ICategory[];
}

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
});