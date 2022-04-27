import React, { ReactNode } from 'react'
import Head from 'next/head'

import Sidenav from '@components/navs/Sidenav'
import { Navbar } from '@components/navs/Navbar'

type MainLayoutProps = {
  title?: string
  children: ReactNode
}

const MainLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <Sidenav>{children}</Sidenav> */}
      <Navbar />
      {children}
    </>
  )
}

export default MainLayout
