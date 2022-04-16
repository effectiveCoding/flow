import React from 'react'
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import FormInput from '@components/FormInputs'

type BaseModalProps = {
  title: string
  isOpen: boolean
  onClose: () => void
}

type SpaceFormField = {
  name: string
  description: string
}

const CreateSpaceModal = ({
  title,
  isOpen,
  onClose,
  ...props
}: BaseModalProps) => {
  const toast = useToast()

  const initialValue: SpaceFormField = {
    name: '',
    description: ''
  }

  const onSubmit = async (
    value: SpaceFormField,
    helpers: FormikHelpers<SpaceFormField>
  ) => {
    const request = await fetch('/api/space', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    const data = await request.json()

    if (request.status === 200) {
      onClose()
      toast({
        title: data?.message,
        position: 'bottom',
        isClosable: true
      })
    } else {
      toast({
        title: data?.message,
        position: 'bottom',
        status: 'error',
        isClosable: true
      })
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <Formik initialValues={initialValue} onSubmit={onSubmit}>
          {({ values, handleChange, isSubmitting }) => (
            <>
              <ModalBody>
                <Form id="createSpaceForm">
                  <FormInput
                    name="name"
                    label="Name"
                    helperContent="Assign you desired name for your Space."
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
                  </FormControl>
                </Form>
              </ModalBody>
              <ModalFooter>
                <ButtonGroup>
                  <Button variant="ghost" onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    form="createSpaceForm"
                    type="submit"
                    colorScheme={'cyan'}
                    color={'white'}
                    isLoading={isSubmitting}
                    loadingText={'Creating Space'}
                  >
                    Create
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

export default CreateSpaceModal
