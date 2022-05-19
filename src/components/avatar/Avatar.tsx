import React from 'react'
import Image from 'next/image'

import { Box } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'

export function Avatar() {
  const { data: session } = useSession()

  return (
    <Box lineHeight="0" rounded="full" overflow="hidden">
      {session && <Image src={session.user?.image!} width={40} height={40} />}
    </Box>
  )
}
