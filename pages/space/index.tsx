import React, { ReactElement } from 'react'
import MainLayout from '@components/layouts/MainLayout'
import { Heading, Text } from '@chakra-ui/react'
import { __baseURL } from '@utils/constants'
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext
} from 'next'

type SpaceProps = {
  space: any
}

const Space = ({ space }: SpaceProps) => {
  return (
    <>
      <Heading mb={2}>My Space</Heading>
      <Text mb={4} fontWeight={'medium'} color={'gray.500'}>
        Collection of space that you are part of!
      </Text>
      {JSON.stringify(space)}
    </>
  )
}

const loadUserSpace = async () => {
  const request = await fetch(`${__baseURL}/api/space`, {
    method: 'GET'
  })
  const data = await request.json()
  return data
}

Space.pageLayout = (page: ReactElement) => (
  <MainLayout title="Capstone Proto - My Space">{page}</MainLayout>
)

export const getStaticPaths: GetStaticPaths =
  async ({}: GetStaticPathsContext) => {
    const data = await loadUserSpace()

    const paths = data?.map((space: any) => ({
      params: { id: space?.id }
    }))

    return {
      paths,
      fallback: 'blocking'
    }
  }

export const getStaticProps: GetStaticProps =
  async ({}: GetStaticPropsContext) => {
    const space = await loadUserSpace()

    return {
      props: {
        space
      },
      revalidate: 10
    }
  }

export default Space
