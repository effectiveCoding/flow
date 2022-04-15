import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import SidenavContent from './SidenavContent'
import SidenavMobile from './SidenavMobile'

type SidenavProps = {
  children: ReactNode
}

const Sidenav = ({ children }: SidenavProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Box minH="100vh">
      <SidenavContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidenavContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <SidenavMobile onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

export default Sidenav
