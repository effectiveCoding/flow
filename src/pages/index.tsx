import React, { ReactElement } from 'react'
import { MainLayout } from '@app/components'

const Home = () => {
  return (
    <>
      <h1>Home</h1>
    </>
  )
}

Home.pageLayout = (page: ReactElement) => (
  <MainLayout title="Capstone Proto - Home">{page}</MainLayout>
)

export default Home
