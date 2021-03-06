import { NextApiRequest, NextApiResponse } from 'next'

import { Classroom } from '@prisma/client'
import { prisma } from 'prisma/prisma'
import { RESOURCE_NOT_FOUND, UNSUPPORTED_MEDIA } from '@app/constants'

type SpaceApiRequest = NextApiRequest & {
  query: { id: string }
}

const handler = async (
  req: SpaceApiRequest,
  res: NextApiResponse<Classroom | { error: string }>
) => {
  if (req.method === 'GET') {
    return await getRoom(req, res)
  } else {
    return res.status(415).json({ error: UNSUPPORTED_MEDIA })
  }
}

async function getRoom(
  req: SpaceApiRequest,
  res: NextApiResponse<Classroom | { error: string }>
) {
  const { id } = req.query
  const room = await prisma?.classroom.findUnique({
    where: { id },
    include: {
      owner: true,
      posts: {
        include: { publisher: true }
      }
    }
  })

  if (!room) {
    return res.status(404).send({ error: RESOURCE_NOT_FOUND })
  }

  res.json(room)
}

export default handler
