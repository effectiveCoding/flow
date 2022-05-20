import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: any) {
  const url = req.nextUrl.clone()

  if (url.pathname.startsWith('/api')) return NextResponse.next()

  const token = await getToken({ req })

  url.search = new URLSearchParams(`callbackUrl=${url.pathname}`).toString()
  url.pathname = '/api/auth/signin'
  return !token ? NextResponse.redirect(url) : NextResponse.next()
}
