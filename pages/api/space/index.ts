import Joi from 'joi'

import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { Space } from '@prisma/client'
import { prisma } from '@db/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method

  if (method === 'GET') {
    return await getAsociatedSpace(req, res)
  } else if (method === 'POST') {
    return await createSpace(req, res)
  } else {
    return res
      .status(415)
      .send({ message: 'Oh no! we are unable to process this request.' })
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

async function createSpace(
  req: SpaceApiRequest,
  res: NextApiResponse<Space | { error: string }>
) {
  const session = await getSession({ req })
  const email = session?.user?.email!

  const result = validateSpaceInputs(req)

  if (typeof result === 'string') {
    // If result returned a string then there's an error
    return res.status(400).send({ error: result })
  }

  // if all fields is valid then proceed with the creation.
  const space = await prisma.space.create({
    data: {
      name: result.name,
      description: result.description,
      post: { create: {} },
      owner: { connect: { email } }
    }
  })

  res.json(space)
}

async function getAsociatedSpace(
  req: NextApiRequest,
  res: NextApiResponse<Space[] | { error: string }>
) {
  const session = await getSession({ req })
  const email = session?.user?.email!

  const spaces = await prisma.space.findMany({
    where: { owner: { email } }
  })

  if (!spaces) {
    return res.status(500).send({ error: 'Unable to get all asociated space' })
  }

  res.json(spaces)
}

export default handler
