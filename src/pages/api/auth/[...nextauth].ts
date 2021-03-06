import type { NextApiRequest, NextApiResponse } from 'next'

import NextAuth, { Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '@app/db-client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    debug: process.env.NEXTAUTH_DEBUG === 'true',
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
      })
    ],
    session: {
      strategy: 'jwt'
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user)
        return token
      },
      session: async ({ session, token }) => {
        if (token.user) session.user = token.user as any
        return session
      }
    }
  })
}
