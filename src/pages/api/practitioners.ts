import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const practitioners = await prisma.practitioner.findMany();

  res.status(200).json(practitioners);
};
