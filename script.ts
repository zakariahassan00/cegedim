import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

const resetDb = async () => {
  await prisma.practitioner.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.appointment.deleteMany();
};

const initPatients = async () => {
  for (let i = 0; i < 10; i++) {
    await prisma.patient.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        birthDate: faker.date.past(),
      },
    });
  }
};
const initPractitioners = async () => {};
const initAppointments = async () => {};
const initAvailabilities = async () => {};

const main = async () => {
  await resetDb();
  await initPractitioners();
  await initPatients();
  await initAppointments();
  await initAvailabilities();
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
