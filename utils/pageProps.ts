import { AppProps } from 'next/app'
import { PageLayout } from '@utils/pageLayout'

export type pageProps = AppProps & {
  Component: PageLayout
}
