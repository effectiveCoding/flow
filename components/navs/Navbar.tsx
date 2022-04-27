import React from 'react'
import Image from 'next/image'
import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'

export const Navbar = () => {
  const { data: session, status } = useSession()

  return (
    <Box as="nav" px={{ base: '4', md: '5' }}>
      <Box py={{ base: '4', md: '5' }}>
        <HStack justify="space-between">
          <Text fontWeight="semibold">Capstone</Text>
          {session && (
            <Menu>
              <MenuButton
                letterSpacing="0"
                rounded="md"
                fontSize="0"
                overflow="hidden"
              >
                <Image src={session?.user?.image!} width={39} height={39} />
              </MenuButton>
              <MenuList display="block">
                <MenuItem>Classrooms</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          )}
          {!session && status !== 'loading' && (
            <Button variant="solid" colorScheme="blue" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
        </HStack>
      </Box>
    </Box>
  )
}
