import React, { createElement } from 'react'
import { IconButton, Stack, StackProps } from '@chakra-ui/react'

import {
  BiAt,
  BiBold,
  BiCode,
  BiListUl,
  BiPaperclip,
  BiUnderline
} from 'react-icons/bi'
import type { IconType } from 'react-icons'
import { useEditor } from 'src/contexts/EditorContext'

export interface Menu {
  label: string
  icon: IconType
  command: () => void
}

export interface EditorMenuProps extends StackProps {}

export function EditorMenu({ children, ...props }: EditorMenuProps) {
  const { editor } = useEditor()

  let menuButtons: Menu[] = []

  if (editor)
    menuButtons = [
      { label: 'attachments', icon: BiPaperclip, command: () => {} },
      {
        label: 'code_block',
        icon: BiCode,
        command: () => editor?.chain().focus().toggleCodeBlock().run()
      },
      { label: 'mention', icon: BiAt, command: () => {} },
      {
        label: 'bold',
        icon: BiBold,
        command: () => editor?.chain().focus().toggleBold().run()
      },
      {
        label: 'underline',
        icon: BiUnderline,
        command: () => editor.chain().focus().toggleUnderline().run()
      },
      {
        label: 'list_items',
        icon: BiListUl,
        command: () => editor.chain().focus().toggleBulletList().run()
      }
    ]

  return (
    <Stack
      mt="0"
      spacing={2}
      direction="row"
      justify="space-between"
      {...props}
    >
      <Stack spacing={2} direction="row">
        {menuButtons.map(button => (
          <IconButton
            key={button.label}
            fontSize="20"
            icon={createElement(button.icon)}
            aria-label={button.label}
            onClick={() => button.command()}
          />
        ))}
      </Stack>
      {children}
    </Stack>
  )
}
