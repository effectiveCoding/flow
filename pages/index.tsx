import React from 'react'
import Welcome from 'components/Welcome'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { getSession } from 'next-auth/react'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination:
          '/api/auth/signin?callbackUrl=' + encodeURIComponent(ctx.resolvedUrl)
      }
    }
  }

  return {
    props: {}
  }
}

const Home = () => {
  return (
    <>
      <h1>Hi user</h1>
      <Welcome />
    </>
  )
}

export default Home
