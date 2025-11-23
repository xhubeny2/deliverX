import { z } from 'zod';

// Forms validation
export const DeliveryFormSchema = z.object({
  recipientName: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
  orderNumber: z.string().min(1, 'Required'),
  status: z.enum(['PENDING', 'IN_TRANSIT', 'DELIVERED', 'FAILED']),
  deliveryTime: z.date('Required.'),
});

// Type
export type DeliveryFormValues = z.infer<typeof DeliveryFormSchema>;
