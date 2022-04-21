import React, { ReactElement } from 'react'
import MainLayout from '@components/layouts/MainLayout'
import {
  Box,
  Flex,
  Heading,
  Text,
  Spacer,
  Grid,
  GridItem,
  Button,
  useDisclosure,
  VStack,
  Icon,
  HStack
} from '@chakra-ui/react'

import useSWR from 'swr'
import Card from '@components/Card'
import CreateSpaceModal from '@components/modal/CreateSpaceModal'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { BiPlus } from 'react-icons/bi'

const Space = ({ space }: any) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { data } = useSWR(
    '/api/space',
    async key => await (await fetch(key)).json(),
    { fallbackData: space }
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
      <Grid
        gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {data?.space?.map((space: any) => (
          <GridItem key={space.id}>
            <Card name={space?.name} description={space?.description} />
          </GridItem>
        ))}
      </Grid>
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

export const getServerSideProps: GetServerSideProps = async ({
  req
}: GetServerSidePropsContext) => {
  const space = await fetch(`${process.env.NEXTAUTH_URL}/api/space`, {
    method: 'GET'
  })

  return {
    props: {
      space: await space.json()
    }
  }
}

export default Space
