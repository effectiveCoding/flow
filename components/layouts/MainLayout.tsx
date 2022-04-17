import React, { ReactNode } from 'react'
import Head from 'next/head'

import Sidenav from '@components/navs/Sidenav'

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
      <Sidenav>{children}</Sidenav>
    </>
  )
}

export default MainLayout
