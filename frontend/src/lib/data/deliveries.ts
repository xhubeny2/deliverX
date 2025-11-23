import prisma from '@/lib/prisma';
import { Delivery } from '@/../generated/prisma/client';

export async function getAllDeliveries(): Promise<Delivery[] | null> {
  try {
    // Simulate slow network
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    return await prisma.delivery.findMany({ orderBy: { orderNumber: 'asc' } });
  } catch (error) {
    console.error('Delivery read error:', error);
    return null;
  }
}

export async function getDeliveryById(deliveryId: string): Promise<Delivery | null> {
  try {
    return await prisma.delivery.findUnique({
      where: { id: deliveryId },
    });
  } catch (error) {
    console.error('Delivery read error:', error);
    return null;
  }
}
