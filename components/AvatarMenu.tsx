import {
  Flex,
  Text,
  Menu,
  MenuButton,
  HStack,
  Avatar,
  VStack,
  Box,
  MenuList,
  useColorModeValue,
  MenuItem,
  MenuDivider,
  Button,
  IconButton
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { BiChevronDown } from 'react-icons/bi'

type AvatarMenuProps = {}

const AvatarMenu = ({}: AvatarMenuProps) => {
  const { data: session } = useSession()

  return (
    <Flex alignItems={'center'}>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
          <HStack spacing={'3'}>
            <Avatar size={'sm'} src={`${session?.user?.image}`} />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">{session?.user?.name}</Text>
              <Text fontSize="xs" color="gray.600">
                Admin
              </Text>
            </VStack>
            <Box display={{ base: 'none', md: 'flex' }}>
              <BiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          display="block"
          bg={useColorModeValue('white', 'gray.900')}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Billing</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default AvatarMenu
