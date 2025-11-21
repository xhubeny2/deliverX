import prisma from '@/lib/prisma';
import { Driver } from '@/../generated/prisma/client';

export async function getAllDrivers(): Promise<Driver[] | null> {
  try {
    // Just for Skeleton demonstration
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return await prisma.driver.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Driver read error:', error);
    return null;
  }
}
