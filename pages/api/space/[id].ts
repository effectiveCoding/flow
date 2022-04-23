import { getSpaceById } from '@lib/spaceOperations'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (req.method === 'GET') {
    const space = await getSpaceById(`${id}`)
    return res.status(200).send({ space })
  }
}

export default handler
