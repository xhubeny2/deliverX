import * as z from 'zod';

export const RunFormSchema = z.object({
  driverId: z.string('Please select a driver to proceed.'),
});

export type RunFormValues = z.infer<typeof RunFormSchema>;
