import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import { __baseURL } from 'utils/constants'

const signinPath = `${__baseURL}/api/auth/signin?callbackUrl=`

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (!token) {
        NextResponse.redirect(
          `${signinPath}/${encodeURIComponent(req.nextUrl.pathname)}`,
          302
        )
        return false
      }
      return true
    }
  }
})
