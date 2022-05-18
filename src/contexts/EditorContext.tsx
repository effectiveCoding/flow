import React, { createContext, ReactNode, useContext } from 'react'

import {
  EditorContentProps,
  JSONContent,
  Extensions,
  useEditor as useTiptapEditor
} from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'

export const extensions: Extensions = [
  StarterKit,
  Underline,
  Placeholder.configure({
    placeholder: ({ node }) => {
      return node.type.name === 'heading'
        ? 'Document Title'
        : 'Write something...'
    },
    showOnlyWhenEditable: true
  })
]

export interface Editor extends EditorContentProps {
  extensions?: Extensions
}

export const EditorContext = createContext<Editor>({ editor: null })

export const useEditor = () => useContext(EditorContext)

export interface EditorProviderProps {
  children: ReactNode
}

export function EditorProvider({ children }: EditorProviderProps) {
  const editor = useTiptapEditor({
    extensions
  })

  return (
    <EditorContext.Provider value={{ editor, extensions }}>
      {children}
    </EditorContext.Provider>
  )
}
