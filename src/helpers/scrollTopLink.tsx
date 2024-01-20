import React, { FC } from "react"
import { Link } from "react-router-dom"

type Props = {
  children: React.ReactNode,
  to: string,
  onClose?: () => void,
}

export const ScrollTopLink: FC<Props> = ({ children, to, onClose }) => {
  const handleOnClick = () => {
    window.scrollTo({
      top: 0,
    })
    onClose?.();
  };

  return (
    <Link to={to} onClick={handleOnClick}>
      {children}
    </Link>
  )
}