import { CrossIcon } from "../../../assets/CrossIcon"
import { SearchIconHeader } from "../../../assets/SearchIcon"
import { SearchBar } from "../../SearchComponents/Search/Search"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Logo } from "../../../Logo/Logo"
import { AccountIcon } from "../../../assets/AccountIcon"
import { FC } from "react"
import { LoginForm } from "../../Login/LoginForm"
import { CartIcon } from "../../../assets/CartIcon"
import { useAppSelector } from "../../../app/hooks"
import { Menu } from "../../../assets/Menu"
import classNames from "classnames";
import { useBackgroundOverlay } from "../../../hooks/useBackgroundOverlay"
import './HeaderBar.scss';

type Props = {
  isMenuOpen: boolean,
  isSearchOpen: boolean,
  isLoginOpen: boolean,
  onMenuOpen: () => void,
  onSearchOpen: () => void,
  onLoginOpen: () => void,
  onLoginClose: () => void,
  onSearchClose: () => void
  onMenuClose: () => void,
}

export const HeaderBar: FC<Props> = ({
  isLoginOpen,
  isMenuOpen,
  isSearchOpen,
  onLoginOpen,
  onMenuOpen,
  onSearchOpen,
  onLoginClose,
  onMenuClose,
  onSearchClose
}) => {
  const { cart } = useAppSelector(state => state.cart);
  const user = useAppSelector(state => state.user.user);
  const location = useLocation();

  const cartQuantity = !!cart?.length ? cart?.length : '';

  useBackgroundOverlay(isSearchOpen, 'background-overlay')
  return (
    <div className="header-bar">
      <div className="header-bar__left">
        {isMenuOpen ? (
          <div
            className="header-bar__menu"
            onClick={onMenuClose}
          >
            <CrossIcon />
          </div>
        ) : (
          <div
            className="header-bar__menu"
            onClick={onMenuOpen}
          >
            <Menu />
          </div>
        )}
        <div
          className="header-bar__search"
          onClick={onSearchOpen}
        >
          <SearchIconHeader />
        </div>
        <div>
          <div className={`header-bar__searchBackdrop ${isSearchOpen ? 'active' : ''}`} onClick={onSearchClose}></div>
          <div className={`header-bar__searchBar ${isSearchOpen ? 'active' : ''}`}>
            <SearchBar onCross={onSearchClose} toggledIcon={isSearchOpen} />
          </div>
        </div>
      </div>
      <Link className="header-bar__logo" to="/makeup">
        <Logo />
      </Link>
      <div className="header-bar__right">
        {!user ? (
          <div
            className="header-bar__account"
            onClick={onLoginOpen}
          >
            <AccountIcon />
          </div>
        ) : (
          <Link
            className="header-bar__account"
            to='makeup/user'
          >
            <AccountIcon />
          </Link>
        )}
        {isLoginOpen && (
          <>
            <div className="header-bar__login-overlay" onClick={onLoginClose}></div>
            <div className="header-bar__login">
              <LoginForm onClose={onLoginClose} />
            </div>
          </>
        )}
        <NavLink
          to={!!cart?.length ? '/makeup/cart' : location.pathname}
          className="header-bar__cart"
        >
          <span className={classNames('header-bar__cart-quantity', { 'no-cart': !cart?.length })}>
            {cartQuantity}
          </span>
          <CartIcon />
        </NavLink>
      </div>
    </div>
  )
}