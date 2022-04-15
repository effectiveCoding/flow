import React from 'react'
import { Text, TextProps } from '@chakra-ui/react'

type BrandProps = TextProps & {}

const Brand = ({ fontSize, fontWeight, ...props }: BrandProps) => {
  return (
    <Text fontSize={fontSize} fontWeight={fontWeight} {...props}>
      Capstone
    </Text>
  )
}

export default Brand
