import React, { FC } from "react"

type Props = {
  children: React.ReactNode,
  activeTab: boolean,
}

export const TabWrapper: FC<Props> = ({ children, activeTab }) => {
  return (
    <>
      {activeTab && (
        children
      )}
    </>
  )
}