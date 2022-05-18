import { useRouter } from 'next/router'
import { BiArrowBack } from 'react-icons/bi'
import { Stack, IconButton, Text } from '@chakra-ui/react'

export interface BrandProps {
  returnButton?: boolean
}

export function Brand({ returnButton }: BrandProps) {
  const router = useRouter()

  return (
    <Stack direction="row" align="center" spacing={5}>
      {returnButton && (
        <IconButton
          fontSize={20}
          aria-label="navigate back"
          icon={<BiArrowBack />}
          onClick={() => router.back()}
        />
      )}
      {/* TODO: Add brand logo here instead of label */}
      <Text fontSize="lg" fontWeight="semibold">
        Capstone
      </Text>
    </Stack>
  )
}
