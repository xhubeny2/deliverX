import { PrismaClient } from '@/../generated/prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

export const prisma = globalForPrisma.prisma || new PrismaClient({});

// Logika pro zabránění zahlcení spojení v dev režimu
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
