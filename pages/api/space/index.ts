import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { createSpace, getAllAsociatedSpace } from '@lib/spaceOperations'
import { UNAUTHORIZED_REQUEST } from '@utils/constants'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const method = req.method
  const session = await getSession({ req })

  const email = session?.user?.email!

  switch (method) {
    case 'GET':
      const userSpace = await getAllAsociatedSpace(email)
      res.send({ space: userSpace })
      break
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
}

export default handler
