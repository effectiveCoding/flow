import {
  FlexProps,
  Flex,
  Text,
  useColorModeValue,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  Box,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react'
import AvatarMenu from '@components/AvatarMenu'
import Brand from '@components/Brand'
import { BiBell, BiMenu } from 'react-icons/bi'

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const SidenavMobile = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        fontSize={'20'}
        aria-label="open menu"
        icon={<BiMenu />}
      />

      <Brand fontWeight={'extrabold'} display={{ base: 'flex', md: 'none' }} />

      <HStack spacing={{ base: '3', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          fontSize={'20'}
          aria-label="open menu"
          icon={<BiBell />}
        />
        <AvatarMenu />
      </HStack>
    </Flex>
  )
}

export default SidenavMobile
