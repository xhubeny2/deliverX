'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { DeliveryFormSchema, DeliveryFormValues } from '@/lib/validations';

export async function createDelivery(data: DeliveryFormValues) {
  try {
    const validatedData = DeliveryFormSchema.parse(data);

    await prisma.delivery.create({
      data: {
        orderNumber: validatedData.orderNumber,
        recipientName: validatedData.recipientName,
        address: validatedData.address,
        status: validatedData.status,
      },
    });

    revalidatePath('/dashboard/deliveries');

    return { success: true };
  } catch (error) {
    console.error('Create Delivery error:', error);

    if (error instanceof z.ZodError) {
      // Zod validation error
      return { success: false, message: 'Invalid form data.' };
    }

    // Other errors (DB,...)
    return { success: false, message: 'Failed to create a delivery.' };
  }
}

export async function updateDeliveryStatus(deliveryId: string, newStatus: string) {
  try {
    // Slow network simulation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: newStatus,
      },
    });

    revalidatePath('/driver');
    revalidatePath('/tracking');

    return { success: true };
  } catch (error) {
    console.error('Delivery update error:', error);
    return { success: false, message: 'Cannot update Delivery status.' };
  }
}
