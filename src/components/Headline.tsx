import { Heading, HeadingProps, Stack, Text } from '@chakra-ui/react'

export function Headline({
  heading,
  description
}: {
  heading: string
  description?: string
}) {
  return (
    <Stack>
      <Heading as="h4" size="md" color="gray.900">
        {heading}
      </Heading>
      <Text fontSize="sm" color="gray.500">
        {description}
      </Text>
    </Stack>
  )
}
