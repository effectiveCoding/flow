import React, { ReactElement } from 'react'
import { MainLayout } from 'src/components/layouts/MainLayout'

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
