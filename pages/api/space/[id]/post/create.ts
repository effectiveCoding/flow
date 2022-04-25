import { prisma } from '@db/prisma'
import { Announcement } from '@prisma/client'
import Joi from 'joi'
import { NextApiRequest, NextApiResponse } from 'next'

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
    content: Joi.string().min(5).max(100).required()
  })

  const { error, value } = schama.validate(req.body)

  if (error) return error.message

  return value
}

async function createAnnouncement(
  req: PostApiRequest,
  res: NextApiResponse<Announcement | { error: string }>
) {
  const { pid: id } = req.query

  const result = validateSpaceInputs(req)

  if (typeof result === 'string') {
    return res.status(400).json({ error: result })
  }

  const annoucement = await prisma.announcement.create({
    data: {
      content: result.content,
      Post: { connect: { id } }
    }
  })

  res.json(annoucement)
}

export default handler
