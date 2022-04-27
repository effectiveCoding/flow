import React, { ReactNode } from 'react'
import Head from 'next/head'

import { Navbar } from '@components/navs/Navbar'
import { Box } from '@chakra-ui/react'

type MainLayoutProps = {
  title?: string
  children: ReactNode
  navCreateLayout?: boolean
}

const MainLayout = ({ title, children, navCreateLayout }: MainLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar createLayout={navCreateLayout} />
      <Box px={{ base: '4', md: '20' }}>{children}</Box>
    </>
  )
}

export default MainLayout
