import React, { useMemo } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

import { EditorContent, Extension, useEditor } from '@tiptap/react'

import { generateHTML } from '@tiptap/html'

const extensions: Extension[] = [
  StarterKit,
  Placeholder.configure({
    placeholder: ({ node }) => {
      return node.type.name === 'heading'
        ? 'Document Title'
        : 'Write something...'
    },
    showOnlyWhenEditable: true
  })
]

type PostContentProps = {
  doc: any
}

export function PostContent({ doc }: PostContentProps) {
  const content = useMemo(() => {
    return generateHTML(doc, extensions)
  }, [doc])

  const editor = useEditor(
    {
      extensions,
      content,
      editable: false
    },
    [doc]
  )
  return <>{editor && <EditorContent editor={editor} />}</>
}
