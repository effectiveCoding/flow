import type { NextApiRequest, NextApiResponse } from 'next'

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '@app/db-client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
      })
    ]
  })
}
