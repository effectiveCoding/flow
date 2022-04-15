import { Box, BoxProps, CloseButton, Flex, Text } from '@chakra-ui/react'
import Brand from '@components/Brand'
import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import {
  BiHomeHeart,
  BiCompass,
  BiTrendingUp,
  BiBookBookmark,
  BiCog
} from 'react-icons/bi'
import SidenavLink from './SidenavLink'

type SidenavItemProperties = {
  href: string
  label: string
  icon: IconType
}

const sidenavItems: SidenavItemProperties[] = [
  { href: '/', label: 'Home', icon: BiHomeHeart },
  { href: '/', label: 'Explore', icon: BiCompass },
  { href: '/', label: 'Trending', icon: BiTrendingUp },
  { href: '/', label: 'Saved', icon: BiBookBookmark },
  { href: '/', label: 'Settings', icon: BiCog }
]

type SidenavContentProps = BoxProps & {
  onClose: () => void
}

const SidenavContent = ({ onClose, ...props }: SidenavContentProps) => {
  return (
    <Box
      transition="3s ease"
      h="full"
      w={{ base: 'full', md: '60' }}
      pos="fixed"
      {...props}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Brand fontWeight={'extrabold'} />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {sidenavItems?.map(item => (
        <Link key={item.label} href={item.href} passHref>
          <SidenavLink icon={item.icon}>{item.label}</SidenavLink>
        </Link>
      ))}
    </Box>
  )
}

export default SidenavContent
