import React, { ReactElement } from 'react'
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext
} from 'next'
import { __baseURL } from '@utils/constants'
import MainLayout from '@components/layouts/MainLayout'
import { Heading } from '@chakra-ui/react'

export const getStaticPaths: GetStaticPaths =
  async ({}: GetStaticPathsContext) => {
    const request = await fetch(`${__baseURL}/api/space`, {
      method: 'GET'
    })
    const response = await request.json()

    const paths = response.space.map((space: any) => ({
      params: { id: space.id }
    }))

    return {
      paths,
      fallback: false
    }
  }

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext) => {
  const request = await fetch(`${__baseURL}/api/space/${params?.id}`, {
    method: 'GET'
  })
  const space = await request.json()

  return { props: { space } }
}

const SpaceContent = ({ space }: any) => {
  return (
    <>
      <Heading>{space?.name}</Heading>
    </>
  )
}

SpaceContent.pageLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
)

export default SpaceContent
