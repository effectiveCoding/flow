import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Textarea,
  VStack
} from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import React from 'react'
import { FormInput } from '../FormInputs'
import { Headline } from '../Headline'

export interface ClassInfo {
  name: string
  description: string
}

export interface ClassInfoProps {
  onSubmit: (value: ClassInfo, helpers: FormikHelpers<ClassInfo>) => void
}

export function ClassInfo({ onSubmit }: ClassInfoProps) {
  const initialValue: ClassInfo = {
    name: '',
    description: ''
  }

  return (
    <>
      <HStack pb={{ base: '5', md: '10' }}>
        <Headline
          heading="Classroom Details"
          description="Please provide the required basic classroom information."
        />
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
    </>
  )
}
