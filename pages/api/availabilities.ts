import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    console.log(req.query)
    const prisma = new PrismaClient()
    const availabilities = await prisma.availability.findMany(
        //{
        //where: {practitionerId: +req.query.practitionerId},
    //}
    )

    res.status(200).json(availabilities)
  }