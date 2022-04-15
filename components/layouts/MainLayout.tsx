import Sidenav from '@components/navs/Sidenav'
import React, { ReactNode } from 'react'

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Sidenav>{children}</Sidenav>
    </>
  )
}

export default MainLayout
