import '@fontsource/inter'
import '@styles/globals.css'

import React, { ReactElement } from 'react'

import { pageProps } from '@utils/pageProps'
import Providers from '@components/Providers'
import { SessionProvider } from 'next-auth/react'

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
