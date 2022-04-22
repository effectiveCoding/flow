import React from 'react'
import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react'

export const SpaceGrid = (props: SimpleGridProps) => {
  const columns = React.useMemo(() => {
    const count = React.Children.toArray(props.children).filter(
      React.isValidElement
    ).length

    return {
      base: Math.min(1, count),
      md: Math.min(2, count),
      lg: Math.min(2, count),
      xl: Math.min(3, count)
    }
  }, [props.children])

  return (
    <SimpleGrid
      columns={columns}
      columnGap={{ base: '4', md: '6' }}
      rowGap={{ base: '8', md: '6' }}
      {...props}
    />
  )
}
