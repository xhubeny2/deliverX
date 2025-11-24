'use server';

import { prisma } from '@/lib/prisma';

/**
 * Fetches data required for the Ride Generation Wizard:
 * 1. Drivers who are free today (have no runs scheduled for the current date).
 * 2. Deliveries that are scheduled for today and are not yet assigned to any run.
 */
export async function getRideCreationData() {
  try {
    // Today: (00:00:00 to 23:59:59)
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const [drivers, deliveries] = await Promise.all([
      // Fetch drivers who have NO runs scheduled for today
      prisma.driver.findMany({
        where: {
          runs: {
            none: {
              date: {
                gte: startOfDay,
                lt: endOfDay,
              },
            },
          },
        },
      }),

      // Fetch actual delivery objects planned for today (Unassigned & Pending)
      prisma.delivery.findMany({
        where: {
          status: 'PENDING', // Only active/pending deliveries
          runId: null, // Must be unassigned
          deliveryTime: {
            // Scheduled for today
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        orderBy: {
          deliveryTime: 'asc', // Sort by expected time if needed
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
