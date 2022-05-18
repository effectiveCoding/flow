import { ReactNode } from 'react'
import { Box, Stack } from '@chakra-ui/react'

export interface NavbarContainerProps {
  children: ReactNode
}

export function NavbarContainer({ children }: NavbarContainerProps) {
  return (
    <Box maxW="container.xl" mx="auto">
      <Box py={{ base: 2, md: 3 }}>
        <Stack direction="row" justify="space-between">
          {children}
        </Stack>
      </Box>
    </Box>
  )
}
