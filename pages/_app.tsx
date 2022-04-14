import '@fontsource/inter'
import '@styles/globals.css'

import React, { ReactElement } from 'react'

import { pageProps } from '@utils/pageProps'
import Providers from '@components/Providers'

const App = ({ Component, pageProps: { session, ...props } }: pageProps) => {
  const getPageLayout = Component.pageLayout ?? ((page: ReactElement) => page)

  return (
    <Providers session={session}>
      {getPageLayout(<Component {...props} />)}
    </Providers>
  )
}

export default App
