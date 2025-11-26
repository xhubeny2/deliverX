import { withTryCatch } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

export async function getRunByDriverIdAndRunId(driverId: string, runId: string) {
  async function fn() {
    return prisma.run.findUnique({
      where: {
        id: runId,
        driverId: driverId, // Security check: Run must belong to this driver
      },
      include: {
        driver: true,
        deliveries: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }
  return withTryCatch(fn, 'Failed to fetch run data:', null);
}
