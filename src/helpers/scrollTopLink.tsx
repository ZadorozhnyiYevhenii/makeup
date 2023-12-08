import React, { FC } from "react"
import { Link } from "react-router-dom"

type Props = {
  children: React.ReactNode
  to: string,
}

export const ScrollTopLink: FC<Props> = ({ children, to }) => {
  const handleOnClick = () => {
    window.scrollTo({
      top: 0,
    })
  }

  return (
    <Link to={to} onClick={handleOnClick}>
      {children}
    </Link>
  )
}