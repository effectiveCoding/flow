import {
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text
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

export interface ProfileCardProps {
  role: string
  name: string
  image: string
}

export function ProfileCard({ image, name, role }: ProfileCardProps) {
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
        <Avatar src={image} />
      </Box>
      <Stack spacing={0} lineHeight="4" justify={'center'}>
        <Text fontWeight="semibold" color="gray.700" letterSpacing="wider">
          {handleNames(name)}
        </Text>
        {/* TODO: replace with username */}
        <Text fontSize="xs" color="gray.500" fontWeight="medium">
          @antonpalermo
        </Text>
      </Stack>
    </Stack>
  )
}
