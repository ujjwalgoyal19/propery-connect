import { z } from 'zod';

export const createOrderSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(['INR', 'USD']).default('INR'),
  receipt: z.string().optional(),
  notes: z.record(z.string()).optional(),
});

export const verifyPaymentSchema = z.object({
  orderId: z.string(),
  paymentId: z.string(),
  signature: z.string(),
});

export const webhookPayloadSchema = z.object({
  event: z.string(),
  payload: z.record(z.unknown()),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
export type WebhookPayload = z.infer<typeof webhookPayloadSchema>;
