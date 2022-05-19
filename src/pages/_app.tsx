import '@fontsource/inter'
import '@styles/globals.css'

import React, { ReactElement } from 'react'

import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '@app/themes'
import { pageProps } from '@app/layouts'
import { EditorProvider } from '@app/contexts'

export default function App({
  Component,
  pageProps: { session, ...props }
}: pageProps) {
  const getPageLayout = Component.pageLayout ?? ((page: ReactElement) => page)

  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ChakraProvider resetCSS theme={theme}>
        <EditorProvider>
          {getPageLayout(<Component {...props} />)}
        </EditorProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}
