import React, { ReactElement } from 'react'
import { SessionProvider } from 'next-auth/react'

import { pageProps } from '@utils/pageProps'

const App = ({ Component, pageProps: { session, ...props } }: pageProps) => {
  const getPageLayout = Component.pageLayout ?? ((page: ReactElement) => page)

  return (
    <SessionProvider session={session}>
      {getPageLayout(<Component {...props} />)}
    </SessionProvider>
  )
}

export default App
