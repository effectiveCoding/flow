import React, { createElement, ReactNode } from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'

import { BiArrowBack } from 'react-icons/bi'
import { Brand, Navbar } from '@app/components'
import { Box, IconButton } from '@chakra-ui/react'

export function MainLayout({
  title,
  branding,
  children,
  backButton
}: {
  title?: string
  branding?: string
  children: ReactNode
  backButton?: boolean
}) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar>
        {backButton && (
          <IconButton
            variant="ghost"
            icon={createElement(BiArrowBack)}
            aria-label="return button"
            onClick={() => router.back()}
          />
        )}
        <Brand>{branding}</Brand>
      </Navbar>
      <Box maxW="container.lg" mx="auto" my={{ base: 4, md: 5 }}>
        <Box px={{ base: 4, md: 5 }}>{children}</Box>
      </Box>
    </>
  )
}
