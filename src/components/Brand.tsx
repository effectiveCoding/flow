import React from 'react'
import { Heading, HeadingProps } from '@chakra-ui/react'

export function Brand({ ...props }: HeadingProps) {
  return <Heading as="h4" size="sm" fontWeight="semibold" {...props} />
}
