import { prisma } from '@db/prisma'
import { Post } from '@prisma/client'
import Joi from 'joi'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type PostApiRequest = NextApiRequest & {
  body: {
    content: string
  }
  query: {
    id: string
    pid: string
    type: string
  }
}

const handler = async (req: PostApiRequest, res: NextApiResponse) => {
  return createPost(req, res)
}

async function createPost(req: PostApiRequest, res: NextApiResponse) {
  const { id, type } = req.query

  switch (type) {
    case 'annoucement':
      return await createAnnouncement(req, res)
    default:
      res.status(404).json({ error: 'Unable to process the requested object' })
      break
  }
}

function validateSpaceInputs(req: PostApiRequest) {
  const schama = Joi.object({
    content: Joi.object().required()
  })

  const { error, value } = schama.validate(req.body)

  if (error) return error.message

  return value
}

async function createAnnouncement(
  req: PostApiRequest,
  res: NextApiResponse<Post | { error: string }>
) {
  const session = await getSession({ req })
  const result = validateSpaceInputs(req)

  if (typeof result === 'string') {
    return res.status(400).json({ error: result })
  }

  const annoucement = await prisma.post.create({
    data: {
      content: result.content,
      publisher: {
        connect: { email: session?.user?.email! }
      }
    }
  })

  res.json(annoucement)
}

export default handler
