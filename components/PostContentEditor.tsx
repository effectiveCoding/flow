import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

import { Box, Button, Flex, HStack, Text, IconButton } from '@chakra-ui/react'
import { EditorContent, Extension, useEditor } from '@tiptap/react'
import { useSession } from 'next-auth/react'
import {
  BiAt,
  BiBold,
  BiCode,
  BiListUl,
  BiPaperclip,
  BiUnderline
} from 'react-icons/bi'
import { useRouter } from 'next/router'

import { generateHTML } from '@tiptap/html'
import { useSWRConfig } from 'swr'

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

export const PostContentEditor = () => {
  const { data: session } = useSession()
  const { mutate } = useSWRConfig()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const editor = useEditor({
    extensions
  })

  const submitPost = async () => {
    setIsLoading(true)
    if (editor) {
      const json = editor.getJSON()
      await fetch(`/api/post/create?cid=${router.query.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: json })
      })
      editor.commands.clearContent()
      mutate(`/api/room/${router.query.id}`)
    }
    setIsLoading(false)
  }

  return (
    <Flex py={{ base: '4', md: '5' }} direction="column">
      {session && (
        // TODO: move to another component.
        <HStack
          px={{ base: '4', md: '5' }}
          pb={{ base: '5', md: '6' }}
          spacing={3}
        >
          <Box letterSpacing="0" rounded="md" fontSize="0" overflow="hidden">
            <Image src={session?.user?.image!} width={40} height={40} />
          </Box>
          <Box alignItems="start">
            <Box as="h3" fontWeight="medium">
              {session.user?.name}
            </Box>
            <Text color="gray.500" fontSize="sm">
              {/* TODO: base on the roles assigned */}
              {'Instructor'}
            </Text>
          </Box>
        </HStack>
      )}
      {editor && <EditorContent editor={editor} />}
      <Flex
        px={{ base: '4', md: '5' }}
        pt={{ base: '5', md: '6' }}
        justify="space-between"
      >
        <HStack spacing="2">
          {/* TODO: put these buttons to an array */}
          <IconButton
            fontSize="20"
            icon={<BiPaperclip />}
            aria-label="attachment"
          />
          <IconButton fontSize="20" icon={<BiCode />} aria-label="code block" />
          <IconButton fontSize="20" icon={<BiAt />} aria-label="mention" />
          <IconButton fontSize="20" icon={<BiBold />} aria-label="bold" />
          <IconButton
            fontSize="20"
            icon={<BiUnderline />}
            aria-label="underline"
          />
          <IconButton fontSize="20" icon={<BiListUl />} aria-label="list" />
        </HStack>
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => submitPost()}
          isLoading={isLoading}
          loadingText="Posting"
        >
          Post
        </Button>
      </Flex>
    </Flex>
  )
}

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
