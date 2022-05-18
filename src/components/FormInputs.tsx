import React, { HTMLAttributes } from 'react'
import { useField } from 'formik'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input
} from '@chakra-ui/react'

export type FormInputProps = HTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  helperContent?: string
}

export function FormInput({ label, helperContent, ...props }: FormInputProps) {
  const [field, { error, touched }] = useField(props)

  return (
    <FormControl>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <Input id={props.name} {...field} {...props} />
      {helperContent && <FormHelperText>{helperContent}</FormHelperText>}
      {!(error && touched) && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
