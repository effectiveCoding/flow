import Joi from 'joi'

import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { Classroom } from '@prisma/client'
import { prisma } from '@db/prisma'
import { INTERNAL_SERVER, UNSUPPORTED_MEDIA } from '@utils/constants'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method

  if (method === 'GET') {
    return await getClassrooms(req, res)
  } else if (method === 'POST') {
    return await createRoom(req, res)
  } else {
    return res.status(415).send({ error: UNSUPPORTED_MEDIA })
  }
}

type SpaceApiRequest = NextApiRequest & {
  body: {
    name: string
    description?: string
  }
}

// Validate space's request body
function validateSpaceInputs(req: SpaceApiRequest) {
  const schama = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    description: Joi.string().allow('').max(250)
  })

  const { error, value } = schama.validate(req.body)

  if (error) return error.message

  return value
}

async function createRoom(
  req: SpaceApiRequest,
  res: NextApiResponse<Classroom | { error: string }>
) {
  const session = await getSession({ req })
  const email = session?.user?.email!

  const result = validateSpaceInputs(req)

  if (typeof result === 'string') {
    // If result returned a string then there's an error
    return res.status(400).send({ error: result })
  }

  // if all fields is valid then proceed with the creation.
  const space = await prisma.classroom.create({
    data: {
      name: result.name,
      description: result.description,
      owner: { connect: { email } }
    }
  })

  res.json(space)
}

async function getClassrooms(
  req: NextApiRequest,
  res: NextApiResponse<Classroom[] | { error: string }>
) {
  const session = await getSession({ req })
  const email = session?.user?.email!

  const spaces = await prisma.classroom.findMany({
    where: { owner: { email } },
    include: { owner: true }
  })

  if (!spaces) {
    return res.status(500).send({ error: INTERNAL_SERVER })
  }

  res.json(spaces)
}

export default handler
