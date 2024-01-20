import { ApolloError } from "@apollo/client"
import { FC } from "react"
import { ICategory } from "../../../types/ICategory"
import { MobileNavbar } from "../MobileNavbar/MobileNavbar"
import { useWindowResize } from "../../../hooks/useWindowResize"
import { DesktopNavbar } from "../DesktopNavbar/DesktopNavBar"
import cn from 'classnames';

type Props = {
  isSearchOpen: boolean,
  isLoginOpen: boolean,
  isMenuOpen: boolean,
  categories: ICategory[] | undefined,
  error: ApolloError | undefined,
  loading: boolean,
  onCloseMenu: () => void,
}

export const NavBar: FC<Props> = ({
  isMenuOpen,
  isSearchOpen,
  categories,
  error,
  loading,
  isLoginOpen,
  onCloseMenu,
}) => {
  const isMobile = useWindowResize(1023);
  return (
    <>
      {isMobile ? (
        <div className={cn('header__navbar-mobile', {
          show: isMenuOpen,
          'show-menu': isMenuOpen,
          'close-menu': !isMenuOpen,
        })}
        >
          <MobileNavbar
            onCloseMenu={onCloseMenu}
            categories={categories}
            loading={loading}
            error={error}
          />
        </div>
      ) : (
        <DesktopNavbar
          isSearchOpen={isSearchOpen}
          isLoginOpen={isLoginOpen}
          categories={categories} 
          loading={loading} 
          error={error}
        />
      )}
    </>
  )
}