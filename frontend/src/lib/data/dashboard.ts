import prisma from '@/lib/prisma';
import { withTryCatch } from '@/lib/utils';

const now = new Date();
const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

export async function getTodaysDeliveries(): Promise<number> {
  const fn = async () => {
    // Slow network simulation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return prisma.delivery.count({
      where: {
        deliveryDate: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
  };
  return withTryCatch(fn, 'Delivery read error:', 0);
}

export async function getTodaysUnassignedDeliveries(): Promise<number> {
  const fn = async () => {
    return prisma.delivery.count({
      where: {
        deliveryDate: {
          gte: startOfDay,
          lt: endOfDay,
        },
        runId: null,
        status: 'PENDING',
      },
    });
  };
  return withTryCatch(fn, 'Delivery read error:', 0);
}

export async function getTodaysActiveDrivers(): Promise<number> {
  const fn = async () => {
    return prisma.driver.count({
      where: {
        runs: {
          some: {
            date: {
              gte: startOfDay, // Greater than or equal to 00:00 today
              lt: endOfDay, // Strictly less than 00:00 tomorrow
            },
          },
        },
      },
    });
  };
  return withTryCatch(fn, 'Deliveries read error:', 0);
}

export async function getTotalDrivers(): Promise<number> {
  const fn = async () => {
    return prisma.driver.count();
  };
  return withTryCatch(fn, 'Drivers read error:', 0);
}

export async function getCardsData() {
  const fn = async () => {
    const [todaysDeliveries, unassignedDeliveries, activeDrivers, totalDrivers] = await Promise.all(
      [
        getTodaysDeliveries(),
        getTodaysUnassignedDeliveries(),
        getTodaysActiveDrivers(),
        getTotalDrivers(),
      ],
    );

    return {
      todaysDeliveries,
      unassignedDeliveries,
      activeDrivers,
      totalDrivers,
    };
  };
  return withTryCatch(fn, 'Dashboard read error:', {
    todaysDeliveries: 0,
    unassignedDeliveries: 0,
    activeDrivers: 0,
    totalDrivers: 0,
  });
}

export async function getDriversWithTodayRuns() {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // Slow network simulation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return prisma.driver.findMany({
      include: {
        runs: {
          where: {
            date: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
          include: {
            deliveries: {
              select: {
                status: true,
                address: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  } catch (error) {
    console.error('Error fetching drivers with runs:', error);
    return [];
  }
}
