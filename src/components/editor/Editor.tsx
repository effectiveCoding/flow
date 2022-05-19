import React from 'react'

import { EditorContent } from '@tiptap/react'
import { useEditor } from '@app/contexts'

export function Editor() {
  const { editor } = useEditor()

  return <EditorContent editor={editor} />
}
