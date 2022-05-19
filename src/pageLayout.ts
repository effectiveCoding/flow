import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

export type PageLayout = NextPage & {
  pageLayout: (page: ReactElement) => ReactNode
}

export type pageProps = AppProps & {
  Component: PageLayout
}
