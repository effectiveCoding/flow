import React from 'react'
import { BoxProps, Button, ButtonProps, Stack } from '@chakra-ui/react'

import { Editor } from './Editor'
import { EditorMenu } from './EditorMenu'

export interface EditorContentProps extends ButtonProps {}

export function EditorContent({ ...props }: EditorContentProps) {
  return (
    <Stack direction="column" spacing={5} pt={5}>
      <Editor />
      <EditorMenu>
        <Button colorScheme="blue" {...props}>
          Post
        </Button>
      </EditorMenu>
    </Stack>
  )
}
