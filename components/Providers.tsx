import React, { ReactNode } from 'react'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

type ProvidersProps = {
  session?: Session | null
  children: ReactNode
}

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif'
  }
})

const Providers = ({ children, session }: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SessionProvider>
  )
}

export default Providers