import React, { ReactElement, useState } from 'react'
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext
} from 'next'

import { Prisma } from '@prisma/client'
import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'

import { MainLayout } from 'src/components/layouts/MainLayout'

import { __baseURL } from '@utils/constants'
import { useEditor } from 'contexts/EditorContext'

import useSWR, { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { EditorContent } from 'src/components/editor/EditorContent'
import { ProfileCard } from 'src/components/Avatar'
import { useSession } from 'next-auth/react'
import { PostCard, PostContainer } from '@app/components'

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

export interface ClassroomQuery
  extends Prisma.ClassroomGetPayload<{
    include: { posts: { include: { publisher: true } } }
  }> {}

export interface ClassroomProps {
  room: ClassroomQuery
}

export default function Classroom({ room }: ClassroomProps) {
  const router = useRouter()
  const { editor } = useEditor()
  const { mutate } = useSWRConfig()
  const { data: session } = useSession()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data } = useSWR<ClassroomQuery>(
    `/api/room/${router.query.id}`,
    async key => await (await fetch(key)).json(),
    { fallbackData: room, refreshInterval: 1000 }
  )

  async function submitPost() {
    setIsLoading(true)

    if (editor) {
      const json = editor?.getJSON()
      await fetch(`/api/post/create?cid=${router.query.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: json })
      })

      editor?.commands.clearContent()
    }

    mutate(`/api/room/${router.query.id}`)
    setIsLoading(false)
  }

  return (
    <Box>
      <Box mb={{ base: 6, md: 7 }}>
        <Heading>{data?.name}</Heading>
        <Text color="gray.500" fontWeight="medium">
          {data?.description}
        </Text>
      </Box>
      <Box my={5}>
        <Box
          bg="gray.50"
          maxW="container.sm"
          mx="auto"
          shadow="xs"
          p={{ base: 2, md: 3 }}
          rounded="lg"
        >
          {session && (
            <ProfileCard
              image={session?.user?.image!}
              name={session?.user?.name!}
              role="Student"
            />
          )}
          <EditorContent
            onClick={() => submitPost()}
            isLoading={isLoading}
            loadingText="Posting"
          />
        </Box>
        <Box pt={4} maxW="container.sm" mx="auto">
          <PostContainer>
            {data?.posts.map(post => (
              <PostCard key={post.id} doc={post.content} />
            ))}
          </PostContainer>
        </Box>
      </Box>
    </Box>
  )
}

Classroom.pageLayout = (page: ReactElement) => (
  <MainLayout returnButton={true}>{page}</MainLayout>
)
