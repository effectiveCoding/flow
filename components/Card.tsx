import { Box, Stack } from '@chakra-ui/react'
import React from 'react'

import Image from 'next/image'

type CardProps = {
  name: string
  description?: string
}

const Card = ({ name }: CardProps) => {
  return (
    <Box
      maxW={{ base: '', md: 'sm' }}
      w={'full'}
      h="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box h={'210px'} bg={'gray.100'} pos={'relative'}>
        <Image src="/doodle.jpg" layout="fill" />
      </Box>
      <Stack p={6}>
        <Box as="h4" fontWeight="semibold">
          {name}
        </Box>
      </Stack>
    </Box>
  )
}

export default Card
