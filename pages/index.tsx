import React, { ReactElement } from 'react'
import Welcome from 'components/Welcome'
import MainLayout from '@components/layouts/MainLayout'

const Home = () => {
  return (
    <>
      <h1>Hi user</h1>
      <Welcome />
    </>
  )
}

Home.pageLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default Home
