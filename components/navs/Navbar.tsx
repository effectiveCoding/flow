import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/router'

type NavbarMenuItem = {
  label: string
  href: string
}

type NavbarProps = {
  createLayout?: boolean
}

export const Navbar = ({ createLayout }: NavbarProps) => {
  const { data: session, status } = useSession()

  const menuItems: NavbarMenuItem[] = [
    {
      label: 'Classrooms',
      href: '/rooms'
    }
  ]

  const router = useRouter()

  return (
    <Box as="nav" px={{ base: '4', md: '20' }} mb={{ base: '4', md: '5' }}>
      <Box py={{ base: '2', md: '3' }}>
        <Flex align="center" justify="space-between">
          {createLayout ? (
            <IconButton
              fontSize={'20'}
              aria-label="navigate back"
              icon={<BiArrowBack />}
              onClick={() => router.back()}
            />
          ) : (
            <Text fontWeight="semibold">Capstone</Text>
          )}
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
                {menuItems.map(item => (
                  <MenuItem key={item.label}>
                    <Link href={item.href} passHref>
                      <Box as="a" display="block" w="full">
                        {item.label}
                      </Box>
                    </Link>
                  </MenuItem>
                ))}
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
        </Flex>
      </Box>
    </Box>
  )
}
