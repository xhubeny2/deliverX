import prisma from '@/lib/prisma';
import { Delivery } from '@/../generated/prisma/client';

export async function getAllDeliveries(): Promise<Delivery[] | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return await prisma.delivery.findMany();
  } catch (error) {
    console.error('Delivery read error:', error);
    return null;
  }
}
