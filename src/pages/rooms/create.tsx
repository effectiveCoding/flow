import React, { ReactElement } from 'react'

import { FormInput, MainLayout } from '@app/components'

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Text,
  Textarea,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useSWRConfig } from 'swr'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'

type ClassroomInput = {
  name: string
  description: string
}

const CreateClassroom = () => {
  const initialValue: ClassroomInput = {
    name: '',
    description: ''
  }

  const toast = useToast()
  const router = useRouter()
  const { mutate } = useSWRConfig()

  const onSubmit = async (
    value: ClassroomInput,
    helpers: FormikHelpers<ClassroomInput>
  ) => {
    const request = await fetch('/api/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    const data = await request.json()

    if (request.status === 200) {
      mutate('/api/room')
      router.push('/rooms')
      toast({
        title: `Horay! classroom created successfuly`,
        position: 'bottom',
        isClosable: true
      })
    } else {
      // TODO: instead of toas display the error on the input
      toast({
        title: data?.error,
        position: 'bottom',
        status: 'error',
        isClosable: true
      })
    }
  }

  return (
    <Box>
      <Box maxW={'lg'} mx="auto">
        <HStack pb={{ base: '5', md: '10' }}>
          <Box>
            <Heading mb={2}>Create new classroom</Heading>
            <Text color="gray.500" fontWeight="medium">
              To start creating a room, just provide the required details below
            </Text>
          </Box>
        </HStack>

        <Formik initialValues={initialValue} onSubmit={onSubmit}>
          {({ values, handleChange, isSubmitting }) => (
            <Form id="classroomForm">
              <VStack spacing={6}>
                <FormInput
                  name="name"
                  label="Name"
                  helperContent="Assign you desired name for your classroom."
                />
                <FormControl mt="3">
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Description (optional)"
                  />
                  <FormHelperText>
                    Description is optional but we encourage you to provide one
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  w="full"
                  variant="solid"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  loadingText="Creating"
                >
                  Create classroom
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}
CreateClassroom.pageLayout = (page: ReactElement) => (
  <MainLayout title="Capstone Proto - Home" returnButton={true}>
    {page}
  </MainLayout>
)

export default CreateClassroom
