import React, { ReactNode } from 'react'
import Head from 'next/head'

import { Navbar } from '@components/navbar/Navbar'
import { Box } from '@chakra-ui/react'

export interface MainLayoutContainerProps {
  children: ReactNode
}

export function MainLayoutContainer({ children }: MainLayoutContainerProps) {
  return (
    <Box maxW="container.lg" mx="auto" my={{ base: 4, md: 5 }}>
      <Box px={{ base: 4, md: 5 }}>{children}</Box>
    </Box>
  )
}

export interface MainLayoutProps extends MainLayoutContainerProps {
  title?: string
  returnButton?: boolean
}

export function MainLayout({ title, children, returnButton }: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar returnButton={returnButton} />
      <MainLayoutContainer>{children}</MainLayoutContainer>
    </>
  )
}
