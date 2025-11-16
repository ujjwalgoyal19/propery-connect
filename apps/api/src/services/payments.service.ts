import crypto from 'crypto';

import { env } from '@/config/env';
import razorpay from '@/config/razorpay';
import prisma from '@/lib/prisma';

export async function createOrder(amount: number, _currency = 'INR'): Promise<{ orderId: string }> {
  const options = {
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  await prisma.payment.create({
    data: {
      orderId: order.id,
      amount: amount as unknown as Record<string, unknown>,
      currency: 'INR',
      status: 'pending',
      userId: '', // Note: userId should be passed as parameter
    },
  });

  return { orderId: order.id };
}

export async function verifyPayment(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== signature) {
    return false;
  }

  await prisma.payment.update({
    where: { orderId },
    data: {
      paymentId,
      status: 'completed',
    },
  });

  return true;
}

export async function handlePaymentWebhook(
  event: string,
  payload: Record<string, unknown>
): Promise<void> {
  if (event === 'payment.authorized' || event === 'payment.captured') {
    const paymentId = (payload.payment as Record<string, unknown>)?.id;
    if (paymentId && typeof paymentId === 'string') {
      await prisma.payment.updateMany({
        where: { paymentId },
        data: { status: 'completed' },
      });
    }
  }
}
