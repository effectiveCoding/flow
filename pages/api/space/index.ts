import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@db/prisma'
import { getSession } from 'next-auth/react'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const method = req.method
  const session = await getSession({ req })

  switch (method) {
    case 'GET':
      const userSpace = await prisma.space.findMany({
        where: {
          owner: {
            email: session?.user?.email
          }
        }
      })
      res.send({ message: userSpace })
      break
    case 'POST':
      // TODO: add validation here!
      const { name, description } = body
      const space = await prisma.space.create({
        data: {
          name,
          description,
          owner: {
            connect: {
              email: session?.user?.email!
            }
          }
        }
      })
      if (space) {
        return res
          .status(200)
          .send({ message: 'Horay! space created successful.' })
      } else {
        return res.status(500).send({ message: 'Error creating space!' })
      }
  }
}

export default handler
