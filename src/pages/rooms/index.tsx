import useSWR from 'swr'
import React, { ReactElement } from 'react'

import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import { Classroom } from '@prisma/client'

import { Box, Flex, Spacer, Button } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

import { __baseURL } from '@app/constants'
import { RoomGrid, RoomCard, MainLayout, Headline } from '@app/components'

export const getServerSideProps: GetServerSideProps = async () => {
  const req = await fetch(`${__baseURL}/api/room`)
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
        <Headline
          heading="My Classrooms"
          description="Collection of classes you participated into!"
        />
        <Spacer />
        <Button
          onClick={() => router.push('/rooms/create')}
          leftIcon={<BiPlus />}
        >
          Create
        </Button>
      </Flex>

      <RoomGrid>
        {data?.map((space: any) => (
          <RoomCard
            key={space.id}
            name={space?.name}
            cover={'/doodle.jpg'}
            onClick={() => {
              router.push(`/rooms/${space.id}`)
            }}
          />
        ))}
      </RoomGrid>
    </Box>
  )
}

ClassList.pageLayout = (page: ReactElement) => (
  <MainLayout title="Capstone Proto - Home" backButton={true}>
    {page}
  </MainLayout>
)
