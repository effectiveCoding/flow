import React, { ChangeEvent, useState } from 'react'

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack
} from '@chakra-ui/react'
import { Headline } from '@app/components'
import { FormikHelpers } from 'formik'
import { User } from '@prisma/client'
import Image from 'next/image'

export interface ClassMemberSelectProps {
  users?: User[]
  onSubmit?: (value: any, helpers: FormikHelpers<any>) => void
}

export function ClassMemberSelect({ users, onSubmit }: ClassMemberSelectProps) {
  const [query, setQuery] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [selected, setSelected] = useState<User[]>()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    setQuery(value)

    if (value === '') {
      setVisible(false)
    } else {
      setVisible(true)
    }

    if (users) {
      const result = users.filter(
        user =>{
          const name = user.name!.toLowerCase().indexOf(value.toLowerCase()) >= 0
          const email = user.email!.toLowerCase().indexOf(value.toLowerCase()) >= 0
          return name || email
        }
      )
      setSelected(result)
    }
  }

  return (
    <>
      <HStack pb={{ base: '5', md: '10' }}>
        <Headline
          heading="Select classroom participants"
          description="Classroom is created with people, select a user or add them later."
        />
      </HStack>
      <Box position="relative">
        <FormControl>
          <FormLabel>Search users</FormLabel>
          <Input
            id="searchInput"
            name="searchInput"
            value={query}
            onChange={e => handleChange(e)}
          />
        </FormControl>
        {visible && (
          <Box
            bg="gray.50"
            shadow="xs"
            mt="10px"
            rounded="md"
            p="20px"
            css={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-track': {
                width: '6px'
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '24px'
              }
            }}
          >
            {selected && selected.length === 0 ? (
              <Text
                px={3}
                py={2}
                minW="md"
                maxW="md"
                textAlign="center"
                fontWeight="medium"
              >
                {query} is not available
              </Text>
            ) : (
              selected?.map((user, index) => (
                <Details
                  key={user.id + index}
                  name={user.name!}
                  email={user.email!}
                  image={user.image!}
                />
              ))
            )}
          </Box>
        )}
      </Box>
    </>
  )
}

export function Details({
  name,
  image,
  email
}: {
  name: string
  image: string
  email: string
}) {
  return (
    <Flex direction="row" p="2" _hover={{bg: 'gray.100'}} rounded="md" cursor="pointer">
      <Box overflow="hidden" rounded="full" lineHeight="0">
      <Image src={image} width={40} height={40} />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" ml="5">
        <Heading as="h4" size="sm">
          {name}
        </Heading>
        <Text color="gray.500" fontSize="xs">
          {email}
        </Text>
      </Box>
    </Flex>
  )
}
