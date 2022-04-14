import { Session } from 'next-auth'
import React, { ReactNode } from 'react'
import SessionProvider from './Session'

type ProviderProps = {
  session: Session | null
  children: ReactNode
}

export const Providers = ({ children, session }: ProviderProps) => {
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  )
}
