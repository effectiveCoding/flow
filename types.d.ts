import type { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id?: string | null
      isAdmin?: boolean | null
      username?: string | null
    }
  }
}
