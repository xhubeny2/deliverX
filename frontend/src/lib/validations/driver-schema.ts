import { z } from 'zod';

// Forms validation
export const DriverFormSchema = z.object({
  name: z.string().min(1, 'Required'),
  car: z.string().min(1, 'Required'),
});

// Type
export type DriverFormValues = z.infer<typeof DriverFormSchema>;
