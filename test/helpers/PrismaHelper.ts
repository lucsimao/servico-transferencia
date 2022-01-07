import { PrismaClient } from '@prisma/client';

export const prismaClearTransferDatabase = async () => {
  const prisma = new PrismaClient();
  await prisma.transfer.deleteMany({});
};
