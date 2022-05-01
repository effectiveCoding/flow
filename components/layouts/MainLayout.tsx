import React, { ReactNode } from 'react'
import Head from 'next/head'

import { Navbar } from '@components/navbar/Navbar'
import { Box } from '@chakra-ui/react'

type MainLayoutProps = {
  title?: string
  children: ReactNode
  returnButton?: boolean
}

const MainLayout = ({ title, children, returnButton }: MainLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar returnButton={returnButton} />
      <Box px={{ base: '4', md: '20' }}>{children}</Box>
    </>
  )
}

export default MainLayout
