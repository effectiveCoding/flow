import {
  FlexProps,
  Flex,
  IconButton,
  HStack,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import Brand from '@components/Brand'
import { BiBell, BiMenu } from 'react-icons/bi'

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const SidenavMobile = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <>
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

        <Brand
          fontWeight={'extrabold'}
          display={{ base: 'flex', md: 'none' }}
        />

        <HStack spacing={{ base: '2', md: '3' }}>
          <IconButton
            size="lg"
            variant="ghost"
            fontSize={'20'}
            aria-label="open menu"
            icon={<BiBell />}
          />
        </HStack>
      </Flex>
    </>
  )
}

export default SidenavMobile
