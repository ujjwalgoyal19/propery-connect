import { z } from 'zod';

export const generateTokenSchema = z.object({
  phone: z
    .string()
    .min(10)
    .regex(/^\+?[1-9]\d{1,14}$/),
});

export const verifyTokenSchema = z.object({
  token: z.string().uuid(),
});

export const phoneSchema = z
  .string()
  .min(10)
  .regex(/^\+?[1-9]\d{1,14}$/);
export const emailSchema = z.string().email();

export type GenerateTokenInput = z.infer<typeof generateTokenSchema>;
export type VerifyTokenInput = z.infer<typeof verifyTokenSchema>;
