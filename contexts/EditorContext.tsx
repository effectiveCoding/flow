import React, { createContext, ReactNode, useContext } from 'react'

import {
  EditorContentProps,
  JSONContent,
  useEditor as useTiptapEditor
} from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'

export interface Editor extends EditorContentProps {
  getJSONContent?: () => JSONContent
}

export const EditorContext = createContext<Editor>({ editor: null })

export const useEditor = () => useContext(EditorContext)

export interface EditorProviderProps {
  children: ReactNode
}

export function EditorProvider({ children }: EditorProviderProps) {
  const editor = useTiptapEditor({
    extensions: [
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
  })

  function getJSONContent(): JSONContent {
    return editor?.getJSON()!
  }

  return (
    <EditorContext.Provider value={{ editor, getJSONContent }}>
      {children}
    </EditorContext.Provider>
  )
}
