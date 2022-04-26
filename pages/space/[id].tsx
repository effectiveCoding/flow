import React, { ReactElement } from 'react'
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext
} from 'next'
import { __baseURL } from '@utils/constants'
import MainLayout from '@components/layouts/MainLayout'
import { Button, Heading, VStack } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import FormInput from '@components/FormInputs'

export const getStaticPaths: GetStaticPaths =
  async ({}: GetStaticPathsContext) => {
    const request = await fetch(`${__baseURL}/api/space`, {
      method: 'GET'
    })
    const response = await request.json()

    const paths = response.map((space: any) => ({
      params: { id: space.id }
    }))

    return {
      paths,
      fallback: false
    }
  }

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext) => {
  const request = await fetch(`${__baseURL}/api/space/${params?.id}`, {
    method: 'GET'
  })
  const space = await request.json()

  return { props: { space } }
}

// TODO: Add types here for space
const SpaceContent = ({ space }: any) => {
  console.log(space)

  const initialValue = {
    content: ''
  }

  const onSubmit = async (value: any, helper: FormikHelpers<any>) => {
    const req = await fetch(
      `/api/space/${space.id}/post/create?pid=${space.postId}&type=annoucement`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      }
    )
    const annoucement = await req.json()
  }

  return (
    <>
      <VStack>
        <Heading>{space?.name}</Heading>
        <Formik initialValues={initialValue} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form id="post_form">
              <FormInput name="content" label="content" />
              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Posting"
              >
                Post
              </Button>
            </Form>
          )}
        </Formik>
      </VStack>
      {space.post.announcements.map((a: any) => (
        <h1>{a.content}</h1>
      ))}
    </>
  )
}

SpaceContent.pageLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
)

export default SpaceContent
