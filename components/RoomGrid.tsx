import React from 'react'
import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react'

export const RoomGrid = (props: SimpleGridProps) => {
  const columns = React.useMemo(() => {
    return {
      base: Math.min(1),
      md: Math.min(2),
      lg: Math.min(2),
      xl: Math.min(3)
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
