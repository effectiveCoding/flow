import React, { ReactElement } from 'react'
import Welcome from 'components/Welcome'
import MainLayout from '@components/layouts/MainLayout'
import { Button } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'

const Home = () => {
  return (
    <>
      <h1>Hi user</h1>
      <Welcome />
      <Button onClick={() => signOut()} colorScheme={'blue'}>
        Sign Out
      </Button>
    </>
  )
}

Home.pageLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default Home
