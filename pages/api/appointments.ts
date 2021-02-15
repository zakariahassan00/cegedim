import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const prisma = new PrismaClient()

    switch(req.method) {
        case 'GET':
            const appointments = await prisma.appointment.findMany()
            res.status(200).json(appointments)
            break
        case 'POST':
            const { practitionerId, patientId, startDate, endDate } = req.body;
            return await prisma.appointment.create({
                data: {
                    practitionerId : practitionerId,
                    patientId : patientId,
                    startDate : startDate,
                    endDate : endDate
                }
            })
    }
  }