import useSWR from 'swr'
import React, { ReactElement } from 'react'

import { __baseURL } from '@utils/constants'
import { MainLayout } from '@components/layouts/MainLayout'

import {
  Box,
  Flex,
  Heading,
  Text,
  Spacer,
  Button,
  HStack
} from '@chakra-ui/react'

import { GetServerSideProps } from 'next'
import { BiPlus } from 'react-icons/bi'
import { RoomGrid } from '@components/RoomGrid'
import { RoomCard } from '@components/RoomCard'
import { useRouter } from 'next/router'
import { Classroom } from '@prisma/client'

export const getServerSideProps: GetServerSideProps = async () => {
  const req = await fetch(`${__baseURL}/api/room`, {
    method: 'GET'
  })

  const spaces = await req.json()

  return {
    props: { spaces }
  }
}

type ClassListProps = {
  rooms: Classroom[]
}

export default function ClassList({ rooms }: ClassListProps) {
  const router = useRouter()

  const { data } = useSWR(
    '/api/room',
    async key => await (await fetch(key)).json(),
    { fallbackData: rooms }
  )

  return (
    <Box>
      <Flex w="full" mb={10} display="flex" alignItems="center">
        <Box>
          <Heading mb={2}>My Classrooms</Heading>
          <Text color="gray.500" fontWeight="medium">
            Collection of classes you participated into!
          </Text>
        </Box>
        <Spacer />
        <Button
          colorScheme="cyan"
          color="white"
          onClick={() => router.push('/rooms/create')}
        >
          <HStack spacing={2}>
            <BiPlus />
            <Text>Create</Text>
          </HStack>
        </Button>
      </Flex>

      <RoomGrid>
        {data?.map((space: any) => (
          <RoomCard
            key={space.id}
            name={space?.name}
            cover={'/doodle.jpg'}
            onClick={() => {
              router.push(`/room/${space.id}`)
            }}
          />
        ))}
      </RoomGrid>
    </Box>
  )
}

ClassList.pageLayout = (page: ReactElement) => (
  <MainLayout title="Capstone Proto - Home" returnButton={true}>
    {page}
  </MainLayout>
)
