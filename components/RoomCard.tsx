import {
  AspectRatio,
  Box,
  Stack,
  Text,
  StackProps,
  useBreakpointValue,
  Button,
  HStack,
  Spacer
} from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

type SpaceCardProps = {
  name: string
  cover: string
  root?: StackProps
  onClick?: () => void
}

export const RoomCard = ({ name, cover, onClick, root }: SpaceCardProps) => {
  return (
    <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} {...root}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Box borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}>
            <Image src={cover} layout="fill" priority={true} />
          </Box>
        </AspectRatio>
        <HStack spacing={1} py="5">
          <Text as={'h4'} fontWeight="semibold">
            {name}
          </Text>
          <Spacer />
          <Button onClick={onClick} variant={'link'}>
            Open
          </Button>
        </HStack>
      </Box>
    </Stack>
  )
}
