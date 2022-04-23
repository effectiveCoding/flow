import { prisma } from '@db/prisma'
import { Space } from '@prisma/client'

export const getAllAsociatedSpace = async (email: string): Promise<Space[]> => {
  return await prisma.space.findMany({
    // TODO: add an OR condition here wherein the email is in member records.
    where: { owner: { email } }
  })
}

export const createSpace = async (
  email: string,
  data: Pick<Space, 'name' | 'description'>
): Promise<Space> => {
  return await prisma.space.create({
    // TODO: only professor can create space
    data: {
      name: data.name,
      description: data.description,
      owner: { connect: { email } }
    }
  })
}

export const getSpaceById = async (id: string) => {
  return await prisma.space.findUnique({
    where: { id }
  })
}
