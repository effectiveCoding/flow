import React, { ReactNode } from 'react'

import { AvatarMenu } from '@app/components'
import { Box, Flex, FlexProps, Stack } from '@chakra-ui/react'

export function NavbarContainer({ ...props }: FlexProps) {
  return (
    <Flex
      maxW="container.xl"
      mx="auto"
      justifyContent="space-between"
      py={{ base: 2, md: 3 }}
      {...props}
    />
  )
}

export function Navbar({ children }: { children: ReactNode }) {
  return (
    <Box as="nav" bg="gray.50" shadow="xs" px={{ base: 4, md: 5 }}>
      <NavbarContainer>
        <Stack direction="row" alignItems="center" spacing={{ base: 2, md: 3 }}>
          {children}
        </Stack>
        <AvatarMenu />
      </NavbarContainer>
    </Box>
  )
}
