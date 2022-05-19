import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react'
import { Avatar } from '@app/components'

export interface MenuLink {
  label: string
  href: string
}

export function AvatarMenu() {
  const router = useRouter()
  const links: MenuLink[] = [
    {
      label: 'Classrooms',
      href: '/rooms'
    }
  ]

  function navigate(path: string) {
    router.push(path)
  }

  return (
    <Menu>
      <MenuButton>
        <Avatar />
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
