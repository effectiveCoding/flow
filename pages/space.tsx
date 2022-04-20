import React, { ReactElement } from 'react'
import MainLayout from '@components/layouts/MainLayout'
import {
  Box,
  Flex,
  Heading,
  Text,
  Spacer,
  Grid,
  GridItem
} from '@chakra-ui/react'

import useSWR from 'swr'
import Card from '@components/Card'

const Space = () => {
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
    </Box>
  )
}

Space.pageLayout = (page: ReactElement) => (
  <MainLayout title="Capstone Proto - Home">{page}</MainLayout>
)

export default Space
