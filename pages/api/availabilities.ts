import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {

    console.log(req.query)
    const prisma = new PrismaClient()
    const availabilities = prisma.availability.findMany({
        where: {practitionerId: +req.query.practitionerId},
    })

    res.status(200).json(availabilities)
  }