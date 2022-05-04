import React, { ReactNode } from 'react'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { Button } from '@components/overides/buttonStyleConfig'
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

const Providers = ({ children }: ProvidersProps) => {
  return (
    <EditorProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </EditorProvider>
  )
}

export default Providers
