import React, { memo, useState } from 'react';
import './Header.scss';
import cn from 'classnames';
import { useDisableScroll } from '../../hooks/useDisableScroll';
import { HeaderBar } from '../HeaderBar/HeaderBar';
import { MobileNavbar } from '../MobileNavbar/MobileNavbar';
import { DesktopNavbar } from '../DesktopNavbar/DesktopNavBar';

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
      <div className={cn('header__navbar-mobile', {
        show: isMenuOpen,
        'show-menu': isMenuOpen,
        'close-menu': !isMenuOpen,
      })}
      >
        <MobileNavbar />
      </div>
      <DesktopNavbar
        isSearchOpen={isSearchOpen}
        isLoginOpen={isLoginOpen}
      />
    </header>
  );
});