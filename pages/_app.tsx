import React from 'react'
import { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'

const App = ({ Component, pageProps: { session, ...props } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...props} />
    </SessionProvider>
  )
}

export default App
