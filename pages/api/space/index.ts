import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { Space } from '@prisma/client'
import { prisma } from '@db/prisma'

import { createSpace } from '@lib/spaceOperations'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const method = req.method
  const session = await getSession({ req })

  const email = session?.user?.email!

  switch (method) {
    case 'POST':
      const { name, description } = body
      // TODO: add validation here!
      const createdSpace = await createSpace(email, { name, description })
      if (createdSpace) {
        return res
          .status(200)
          .send({ message: 'Horay! space created successful.' })
      } else {
        return res.status(500).send({ message: 'Error creating space!' })
      }
  }

  if (method === 'GET') {
    return await getAsociatedSpace(req, res)
  } else {
    return res
      .status(415)
      .send({ message: 'Oh no! we are unable to process this request.' })
  }
}

async function getAsociatedSpace(
  req: NextApiRequest,
  res: NextApiResponse<Space[] | { error: string }>
) {
  const session = await getSession({ req })
  const email = session?.user?.email!

  const spaces = await prisma.space.findMany({ where: { owner: { email } } })

  if (!spaces) {
    return res.status(500).send({ error: 'Unable to get all asociated space' })
  }

  res.json(spaces)
}

export default handler
