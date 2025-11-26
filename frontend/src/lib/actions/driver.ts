'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { withTryCatch } from '@/lib/utils';

export async function toggleDeliveryStatus(
  deliveryId: string,
  runId: string,
  newStatus: 'DELIVERED' | 'FAILED',
) {
  async function fn() {
    await prisma.delivery.update({
      where: { id: deliveryId },
      data: {
        status: newStatus,
        // deliveredAt: new Date(), // mozna dodame :)
      },
    });

    // Auto-finish Run: If no in-transit deliveries remain, mark Run as FINISHED
    const inTransitCount = await prisma.delivery.count({
      where: {
        runId: runId,
        status: 'IN_TRANSIT',
      },
    });

    if (inTransitCount === 0) {
      await prisma.run.update({
        where: { id: runId },
        data: {
          status: 'FINISHED',
        },
      });
    }

    const run = await prisma.run.findUnique({
      where: { id: runId },
      select: { driverId: true },
    });

    if (run) {
      revalidatePath(`/driver/${run.driverId}/runs/${runId}`);
    }

    return { success: true, message: 'Delivery status updated successfully.' };
  }
  return withTryCatch(fn, 'Failed to update delivery status:', {
    success: false,
    message: 'Database error',
  });
}
