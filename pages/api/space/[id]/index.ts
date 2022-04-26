import { Space } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@db/prisma'

type SpaceApiRequest = NextApiRequest & {
  query: { id: string }
}

type SpaceErrorResponse = {
  error?: string
}

const handler = async (
  req: SpaceApiRequest,
  res: NextApiResponse<Space | SpaceErrorResponse>
) => {
  if (req.method === 'GET') {
    return await getSpace(req, res)
  }
}

async function getSpace(
  req: SpaceApiRequest,
  res: NextApiResponse<Space | SpaceErrorResponse>
) {
  const { id } = req.query
  const space = await prisma?.space.findUnique({
    where: { id },
    include: {
      post: {
        include: { announcements: true }
      }
    }
  })

  if (!space) {
    return res
      .status(404)
      .send({ error: 'The requested query is not available' })
  }

  res.json(space)
}

export default handler
