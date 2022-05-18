import '@fontsource/inter'
import '@styles/globals.css'

import React, { ReactElement } from 'react'

import { pageProps } from '@app/layouts'
import { SessionProvider } from 'next-auth/react'

import { Providers } from '@app/components'

const App = ({ Component, pageProps: { session, ...props } }: pageProps) => {
  const getPageLayout = Component.pageLayout ?? ((page: ReactElement) => page)

  return (
    <SessionProvider session={session} refetchInterval={0}>
      <Providers session={session}>
        {getPageLayout(<Component {...props} />)}
      </Providers>
    </SessionProvider>
  )
}

export default App
