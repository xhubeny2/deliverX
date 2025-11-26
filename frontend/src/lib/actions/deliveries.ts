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
        deliveryDate: validatedData.deliveryDate,
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

export async function updateDelivery(id: string, data: DeliveryFormValues) {
  try {
    const validatedData = DeliveryFormSchema.parse(data);
    await prisma.delivery.update({
      where: {
        id,
      },
      data: { ...validatedData, updatedAt: new Date() },
    });

    revalidatePath('/driver'); // In case the driver page shows editable deliveries
    revalidatePath('/tracking'); // In case the tracking page shows editable deliveries
    revalidatePath('/dashboard/deliveries'); // In case the admin dashboard shows editable deliveries
    return { success: true };
  } catch (error) {
    console.error('Update Delivery error:', error);

    if (error instanceof z.ZodError) {
      // Zod validation error
      return { success: false, message: 'Invalid form data.' };
    }
    // Other errors (DB,...)
    return { success: false, message: 'Failed to create a delivery.' };
  }
}
