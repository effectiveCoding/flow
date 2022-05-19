import React, { useMemo } from 'react'

import {
  JSONContent,
  EditorContent,
  useEditor as useTiptapEditor
} from '@tiptap/react'

import { generateHTML } from '@tiptap/html'
import { useEditor } from 'src/contexts/EditorContext'

export interface DocContentProps {
  doc: any
}

export function DocContent({ doc }: DocContentProps) {
  const { extensions } = useEditor()
  const content = useMemo(() => {
    return generateHTML(doc, extensions!)
  }, [doc])

  const editor = useTiptapEditor({ extensions, editable: false, content }, [
    doc
  ])

  return <>{editor && <EditorContent editor={editor} />}</>
}
