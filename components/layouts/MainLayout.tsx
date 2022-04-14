import React, { ReactNode } from 'react'

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <h1>MainLayout</h1>
      {children}
    </>
  )
}

export default MainLayout
