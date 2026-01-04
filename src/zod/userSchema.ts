import { z } from 'zod';

export const ValidateUserSchema = z.object({
  email: z.email(),
  password: z.string().trim().min(6, {message: "Password must have at least six characters"})
  .refine((val) => /[A-Z]/.test(val), { message: "Must include an uppercase letter" })
  .refine((val) => /[a-z]/.test(val), { message: "Must include a lowercase letter" })
  .refine((val) => /[0-9]/.test(val), { message: "Must include a number" })
  .refine((val) => /[!@#$%^&*]/.test(val), { message: "Must include a special character" })
});
