import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react'
import { ReactText } from 'react'
import type { IconType } from 'react-icons'

type SidenavLinkProps = FlexProps & {
  icon: IconType
  href?: string
  children: ReactText
}

const SidenavLink = ({ icon, children, href, ...props }: SidenavLinkProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white'
        }}
        {...props}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

export default SidenavLink
