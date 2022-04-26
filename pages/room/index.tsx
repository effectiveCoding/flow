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

import useSWR from 'swr'
import CreateSpaceModal from '@components/modal/CreateSpaceModal'
import { GetServerSideProps } from 'next'
import { BiPlus } from 'react-icons/bi'
import { SpaceGrid } from '@components/SpaceGrid'
import { SpaceCard } from '@components/SpaceCard'
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
    <Box mr={{ base: '0', md: '10' }}>
      <Flex w="full" mb={10} display="flex" alignItems="center">
        <Box>
          <Heading mb={2}>My Space</Heading>
          <Text color="gray.500" fontWeight="medium">
            Collection of Space you participated into!
          </Text>
        </Box>
        <Spacer />
        <Button colorScheme="cyan" color="white" onClick={onOpen}>
          <HStack spacing={2}>
            <BiPlus />
            <Text>Create space</Text>
          </HStack>
        </Button>
      </Flex>

      <SpaceGrid>
        {data?.map((space: any) => (
          <SpaceCard
            key={space.id}
            name={space?.name}
            cover={'/doodle.jpg'}
            onClick={() => {
              router.push(`/room/${space.id}`)
            }}
          />
        ))}
      </SpaceGrid>

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
