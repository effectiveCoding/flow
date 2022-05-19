import React from 'react'
import { useSession } from 'next-auth/react'

import { Avatar } from '@app/components'
import { Stack, Box, Flex, Text } from '@chakra-ui/react'

export interface ProfileCardProps {
  role: string
  name: string
  image: string
}

export function ProfileCard({ name }: ProfileCardProps) {
  const { data: session } = useSession()

  function handleNames(name: string) {
    const values = name.split(' ')
    if (values.length >= 3) {
      return `${values[0]} ${values[1]}`
    } else {
      return values[0]
    }
  }

  return (
    <Stack direction="row" spacing={3}>
      <Box fontSize="0" overflow="hidden">
        <Avatar />
      </Box>
      <Flex lineHeight="4" justify={'center'} direction="column">
        <Text fontWeight="semibold" color="gray.700" letterSpacing="wider">
          {handleNames(session?.user?.name!)}
        </Text>
        {/* TODO: replace with username */}
        <Text fontSize="xs" color="gray.500" fontWeight="medium">
          @antonpalermo
        </Text>
      </Flex>
    </Stack>
  )
}
