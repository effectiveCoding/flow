import React, { ReactNode } from 'react'
import { Session } from 'next-auth'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

type SessionProviderProps = {
  session: Session | null
  children: ReactNode
}

const SessionProvider = ({ children, session }: SessionProviderProps) => {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  )
}

export default SessionProvider
