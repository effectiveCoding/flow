import React, { ReactNode } from 'react'

import { Session } from 'next-auth'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { Button } from 'src/components/overides/buttonStyleConfig'
import { tiptap } from './overides/tiptapStyleConfig'
import { EditorProvider } from 'contexts/EditorContext'

type ProvidersProps = {
  session?: Session | null
  children: ReactNode
}

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif'
  },
  components: {
    Button
  },
  styles: {
    global: (props: any) => ({ ...tiptap(props) })
  }
})

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <EditorProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </EditorProvider>
  )
}
