import React, { ReactElement } from 'react'
import MainLayout from '@components/layouts/MainLayout'

const Space = () => {
  return <h1>My Space</h1>
}

Space.pageLayout = (page: ReactElement) => (
  <MainLayout title="Capstone Proto - My Space">{page}</MainLayout>
)

export default Space
