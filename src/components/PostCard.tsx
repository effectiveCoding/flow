import React from 'react'
import { useSession } from 'next-auth/react'

import { Box, BoxProps } from '@chakra-ui/react'
import { ProfileCard, DocContent } from '@app/components'

export interface PostCardProps extends BoxProps {
  doc: any
}

export function PostCard({ doc }: PostCardProps) {
  const { data: session } = useSession()
  return (
    <Box bg="gray.50" shadow="xs" rounded="lg" p={{ base: 2, md: 3 }}>
      {/* TODO: role */}
      {session && (
        <ProfileCard
          image={session.user?.image!}
          name={session.user?.name!}
          role=""
        />
      )}
      <Box py={{ base: 4, md: 5 }}>
        <DocContent doc={doc} />
      </Box>
    </Box>
  )
}
