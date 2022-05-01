import React, { ReactElement } from 'react'
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext
} from 'next'

import { Prisma } from '@prisma/client'
import { Box, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'

import MainLayout from '@components/layouts/MainLayout'

import { __baseURL } from '@utils/constants'
import { PostContent, PostContentEditor } from '@components/PostContentEditor'

import Image from 'next/image'
import useSWR from 'swr'
import { useRouter } from 'next/router'

export const getStaticPaths: GetStaticPaths =
  async ({}: GetStaticPathsContext) => {
    const getRooms = await fetch(`${__baseURL}/api/room`, {
      method: 'GET'
    })
    const rooms = await getRooms.json()

    const paths = rooms.map((space: any) => ({
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
  const request = await fetch(`${__baseURL}/api/room/${params?.id}`, {
    method: 'GET'
  })

  const room = await request.json()

  return { props: { room } }
}

type ClassroomProps = {
  room: Prisma.ClassroomGetPayload<{
    include: { posts: { include: { publisher: true } } }
  }>
}

export default function Classroom({ room }: ClassroomProps) {
  const router = useRouter()
  const { data } = useSWR<
    Prisma.ClassroomGetPayload<{
      include: { posts: { include: { publisher: true } } }
    }>
  >(
    `/api/room/${router.query.id}`,
    async key => await (await fetch(key)).json(),
    {
      fallbackData: room,
      refreshInterval: 1000
    }
  )

  return (
    <Box>
      <Box mb={10}>
        <Heading>{data?.name}</Heading>
        <Text color="gray.500" fontWeight="medium">
          {data?.description}
        </Text>
      </Box>
      <Box my={5}>
        <Box shadow="xs" maxW="container.sm" mx="auto" rounded="lg">
          <PostContentEditor />
        </Box>
        <Box pt={4} maxW="container.sm" mx="auto">
          <Stack w="full" spacing={5}>
            {data?.posts.map(post => (
              <Box
                key={post.id}
                shadow="xs"
                py={{ base: '4', md: '5' }}
                rounded="lg"
              >
                <Box px={{ base: '4', md: '5' }}>
                  <HStack pb={{ base: '5', md: '6' }} spacing={3}>
                    <Box
                      letterSpacing="0"
                      rounded="md"
                      fontSize="0"
                      overflow="hidden"
                    >
                      <Image
                        src={post.publisher.image!}
                        width={40}
                        height={40}
                      />
                    </Box>
                    <Box alignItems="start">
                      <Box as="h3" fontWeight="medium">
                        {post.publisher?.name}
                      </Box>
                      <Text color="gray.500" fontSize="sm">
                        {/* TODO: base on the roles assigned */}
                        {'Instructor'}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
                <PostContent doc={post.content} />
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

Classroom.pageLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>
