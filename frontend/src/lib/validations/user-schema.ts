import * as z from 'zod';

export const UserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});
