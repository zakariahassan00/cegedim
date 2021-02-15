import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const prisma = new PrismaClient()
    const timeslots = await prisma.timeslot.findMany()

    res.status(200).json(timeslots)
}