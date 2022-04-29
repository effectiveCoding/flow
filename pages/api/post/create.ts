import Joi from 'joi'

import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { Post } from '@prisma/client'

import { prisma } from '@db/prisma'
import { INTERNAL_SERVER, UNSUPPORTED_MEDIA } from '@utils/constants'

type PostApiRequest = NextApiRequest & {
  body: {
    content: string
  }
  query: {
    cid: string
  }
}

function validate(req: PostApiRequest) {
  const schama = Joi.object({
    content: Joi.object().required()
  })
  const { error, value } = schama.validate(req.body)

  if (error) return error.message

  return value
}

const handler = async (req: PostApiRequest, res: NextApiResponse) => {
  const method = req.method
  if (method === 'POST') {
    return await createPost(req, res)
  } else {
    return res.status(415).json({ error: UNSUPPORTED_MEDIA })
  }
}

async function createPost(
  req: PostApiRequest,
  res: NextApiResponse<Post | { error: string }>
) {
  const postData = validate(req)
  const session = await getSession({ req })

  const email = session?.user?.email!
  const id = req.query.cid

  if (typeof postData === 'string')
    return res.status(400).json({ error: postData })

  const post = await prisma.post.create({
    data: {
      content: postData.content,
      publisher: { connect: { email } },
      room: { connect: { id } }
    }
  })

  if (!post) {
    return res.status(500).json({ error: INTERNAL_SERVER })
  }

  res.json(post)
}

export default handler
