import React, { ReactElement } from 'react'
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext
} from 'next'

import { Classroom as PrismaClassroom } from '@prisma/client'
import { Box, Heading, Text } from '@chakra-ui/react'

import MainLayout from '@components/layouts/MainLayout'

import { __baseURL } from '@utils/constants'
import { PostContentEditor } from '@components/PostContentEditor'

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
  const room = await request.json()

  return { props: { room } }
}

type ClassroomProps = {
  room: PrismaClassroom
}

export default function Classroom({ room }: ClassroomProps) {
  return (
    <Box>
      <Box mb="10">
        <Heading mb={2}>{room?.name}</Heading>
        <Text color="gray.500" fontWeight="medium">
          {room.description}
        </Text>
      </Box>
      <Box shadow="xs" maxW="container.sm" mx="auto" rounded="lg">
        <PostContentEditor />
      </Box>
    </Box>
  )
}

Classroom.pageLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>
