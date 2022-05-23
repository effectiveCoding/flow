import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { Box, useToast } from '@chakra-ui/react'
import { useSWRConfig } from 'swr'
import { FormikHelpers } from 'formik'
import { MainLayout } from '@app/components'
import { ClassMemberSelect } from 'src/components/classroom/ClassMemberSelect'
import { GetServerSideProps } from 'next'
import { prisma } from '@app/db-client'
import { User } from '@prisma/client'

type ClassroomInput = {
  name: string
  description: string
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany()

  return {
    props: { users }
  }
}

export interface CreateClassroomProps {
  users: User[]
}

export default function CreateClassroom({ users }: CreateClassroomProps) {
  const initialValue: ClassroomInput = {
    name: '',
    description: ''
  }

  const toast = useToast()
  const router = useRouter()
  const { mutate } = useSWRConfig()

  const onSubmit = async (
    value: ClassroomInput,
    helpers: FormikHelpers<ClassroomInput>
  ) => {
    const request = await fetch('/api/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    const data = await request.json()

    if (request.status === 200) {
      mutate('/api/room')
      router.push('/rooms')
      toast({
        title: `Horay! classroom created successfuly`,
        position: 'bottom',
        isClosable: true
      })
    } else {
      // TODO: instead of toas display the error on the input
      toast({
        title: data?.error,
        position: 'bottom',
        status: 'error',
        isClosable: true
      })
    }
  }

  return (
    <Box>
      <Box maxW={'lg'} mx="auto">
        {/* <ClassInfo onSubmit={onSubmit} /> */}
        <ClassMemberSelect users={users} />
      </Box>
    </Box>
  )
}
CreateClassroom.pageLayout = (page: ReactElement) => (
  <MainLayout
    title="Capstone Proto - Create class"
    branding="Create new classroom"
    backButton={true}
  >
    {page}
  </MainLayout>
)
