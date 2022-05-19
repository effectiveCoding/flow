import React from 'react'
import { Stack, StackProps } from '@chakra-ui/react'

export interface PostContainerProps extends StackProps {}

export function PostContainer({ children, ...props }: PostContainerProps) {
  return (
    <Stack
      maxW="container.sm"
      mx="auto"
      spacing={{ base: 4, md: 5 }}
      {...props}
    >
      {children}
    </Stack>
  )
}
