import React from 'react'

import { Box, Button, Stack } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { MenuLink, ProfileMenu } from '@components/Avatar'

import { Brand, BrandProps } from './Brand'
import { NavbarContainer } from './NavbarContainer'

const links: MenuLink[] = [
  {
    label: 'Classrooms',
    href: '/rooms'
  }
]
export interface NavbarProps extends BrandProps {}

export function Navbar({ returnButton }: NavbarProps) {
  const { data: session } = useSession()

  return (
    <Box as="nav" bg="gray.50" shadow="xs" px={{ base: 4, md: 5 }}>
      <NavbarContainer>
        <Brand returnButton={returnButton} />
        <Stack direction="row">
          {session ? (
            <ProfileMenu src={session.user?.image!} links={links} />
          ) : (
            <Button colorScheme="blue" onClick={() => signIn()}>
              Sign in
            </Button>
          )}
        </Stack>
      </NavbarContainer>
    </Box>
  )
}
