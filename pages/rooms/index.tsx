import useSWR from 'swr'
import React, { ReactElement } from 'react'
import MainLayout from '@components/layouts/MainLayout'
import {
  Box,
  Flex,
  Heading,
  Text,
  Spacer,
  Button,
  useDisclosure,
  HStack
} from '@chakra-ui/react'

import CreateSpaceModal from '@components/modal/CreateSpaceModal'
import { GetServerSideProps } from 'next'
import { BiPlus } from 'react-icons/bi'
import { RoomGrid } from '@components/RoomGrid'
import { RoomCard } from '@components/RoomCard'
import { useRouter } from 'next/router'

const Space = ({ spaces }: any) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const router = useRouter()

  const { data } = useSWR(
    '/api/space',
    async key => await (await fetch(key)).json(),
    { fallbackData: spaces }
  )

  return (
    <Box px={{ base: '4', md: '5' }}>
      <Flex w="full" mb={10} display="flex" alignItems="center">
        <Box>
          <Heading mb={2}>My Classrooms</Heading>
          <Text color="gray.500" fontWeight="medium">
            Collection of classes you participated into!
          </Text>
        </Box>
        <Spacer />
        <Button colorScheme="cyan" color="white" onClick={onOpen}>
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

      <CreateSpaceModal
        title="Create new Space"
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

Space.pageLayout = (page: ReactElement) => (
  <MainLayout title="Capstone Proto - Home">{page}</MainLayout>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const req = await fetch(`${process.env.NEXTAUTH_URL}/api/space`, {
    method: 'GET'
  })

  const spaces = await req.json()

  return {
    props: { spaces }
  }
}

export default Space
