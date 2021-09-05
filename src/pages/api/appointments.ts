import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      const appointments = await prisma.appointment.findMany();
      res.status(200).json(appointments);
      break;
    case 'POST':
      const { patientId, practitionerId, startDate, endDate } = JSON.parse(
        req.body,
      );
      const appointment = await prisma.appointment.create({
        data: {
          patientId: parseInt(patientId),
          practitionerId: parseInt(practitionerId),
          startDate: startDate,
          endDate: endDate,
        },
      });
      res.status(200).json(appointment);
      break;
    case 'PUT':
      const updatedAppointment = JSON.parse(req.body);
      const aappointment = await prisma.appointment.update({
        where: {
          id: +updatedAppointment.id,
        },
        data: {
          patientId: parseInt(updatedAppointment.patientId),
          practitionerId: parseInt(updatedAppointment.practitionerId),
          startDate: updatedAppointment.startDate,
          endDate: updatedAppointment.endDate,
          id: updatedAppointment.id,
        },
      });
      res.status(200).json(aappointment);
      break;
    case 'DELETE':
      const appointmentToBeDeleted = JSON.parse(req.body);
      const deleteAppointment = await prisma.appointment.delete({
        where: {
          id: appointmentToBeDeleted.id,
        },
      });
      res.status(200).json(deleteAppointment);
      break;
  }
};
