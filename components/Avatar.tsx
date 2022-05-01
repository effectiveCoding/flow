import {
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from '@chakra-ui/react'

import Image from 'next/image'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

export interface AvatarProps {
  src: string
}

export function Avatar({ src }: AvatarProps) {
  return (
    <Box letterSpacing="0" rounded="md" fontSize="0" overflow="hidden">
      <Image src={src} width={39} height={39} />
    </Box>
  )
}

export interface MenuLink {
  label: string
  href: string
}

export interface ProfileMenuProps extends AvatarProps {
  links: MenuLink[]
}

export function ProfileMenu({ src, links }: ProfileMenuProps) {
  const router = useRouter()

  function navigate(path: string) {
    router.push(path)
  }

  return (
    <Menu>
      <MenuButton>
        <Avatar src={src} />
      </MenuButton>
      <MenuList>
        {links.map(link => (
          <MenuItem key={link.label} onClick={() => navigate(link.href)}>
            {link.label}
          </MenuItem>
        ))}
        <MenuDivider />
        <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  )
}
