import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

export type PageLayout = NextPage & {
  pageLayout: (page: ReactElement) => ReactNode
}
