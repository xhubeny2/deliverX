'use server';

import { prisma } from '@/lib/prisma';

/**
 * Fetches data required for the Ride Generation Wizard:
 * 1. Drivers who are free today (have no runs scheduled for the current date).
 * 2. Deliveries that are scheduled for today and are not yet assigned to any run.
 */
export async function getRideCreationData() {
  try {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const [drivers, deliveries] = await Promise.all([
      // Fetch drivers who have NO runs scheduled for today
      prisma.driver.findMany({
        where: {
          runs: {
            none: {
              date: {
                lt: endOfDay,
              },
            },
          },
        },
      }),

      // Fetch actual delivery objects planned for today (Unassigned & Pending)
      prisma.delivery.findMany({
        where: {
          status: 'PENDING', // Only pending deliveries
          runId: null, // Must be unassigned
          deliveryDate: {
            // Scheduled for today or days before
            lt: endOfDay,
          },
        },
      }),
    ]);

    return {
      drivers,
      deliveries,
      unassignedDeliveriesCount: deliveries.length,
    };
  } catch (error) {
    console.error('Error fetching ride generation data:', error);
    return {
      drivers: [],
      deliveries: [],
      unassignedDeliveriesCount: 0,
    };
  }
}
