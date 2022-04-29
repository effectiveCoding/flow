import React, { ReactElement } from 'react'
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext
} from 'next'
import { __baseURL } from '@utils/constants'
import MainLayout from '@components/layouts/MainLayout'
import { Box, Heading, Text } from '@chakra-ui/react'
import { PostContentEditor } from '@components/Editor'

export const getStaticPaths: GetStaticPaths =
  async ({}: GetStaticPathsContext) => {
    const request = await fetch(`${__baseURL}/api/space`, {
      method: 'GET'
    })
    const response = await request.json()

    const paths = response.map((space: any) => ({
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

const Classroom = ({ space }: any) => {
  return (
    <Box>
      <Box mb="10">
        <Heading mb={2}>{space?.name}</Heading>
        {space.description && (
          <Text color="gray.500" fontWeight="medium">
            {space.description}
          </Text>
        )}
      </Box>
      <Box shadow="xs" maxW="container.sm" rounded="lg">
        <PostContentEditor />
      </Box>
    </Box>
  )
}

Classroom.pageLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default Classroom
