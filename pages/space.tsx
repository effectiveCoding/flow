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
  useDisclosure
} from '@chakra-ui/react'

import useSWR from 'swr'
import Card from '@components/Card'
import CreateSpaceModal from '@components/modal/CreateSpaceModal'

const Space = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { data } = useSWR(
    '/api/space',
    async key => await (await fetch(key)).json(),
    { refreshInterval: 1000 }
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
          Create
        </Button>
      </Flex>
      <Grid
        gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {data?.space?.map((space: any) => (
          <GridItem key={space.id}>
            <Card name={space?.name} />
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

export default Space
