import type { Request, Response } from 'express';

import * as paymentsService from '@/services/payments.service';
import { errorResponse, successResponse } from '@/utils/response';

export async function createOrder(req: Request, res: Response): Promise<void> {
  try {
    const { amount, currency } = req.body;

    if (!amount || amount <= 0) {
      errorResponse(res, 'Invalid amount', {}, 400);
      return;
    }

    const { orderId } = await paymentsService.createOrder(amount, currency);

    successResponse(res, { orderId }, 'Order created', 201);
  } catch (error) {
    errorResponse(res, 'Error creating order', {}, 500);
  }
}

export async function verifyPayment(req: Request, res: Response): Promise<void> {
  try {
    const { orderId, paymentId, signature } = req.body;

    if (!orderId || !paymentId || !signature) {
      errorResponse(res, 'Missing required fields', {}, 400);
      return;
    }

    const isValid = await paymentsService.verifyPayment(orderId, paymentId, signature);

    if (!isValid) {
      errorResponse(res, 'Invalid payment signature', {}, 400);
      return;
    }

    successResponse(res, { verified: true }, 'Payment verified');
  } catch (error) {
    errorResponse(res, 'Error verifying payment', {}, 500);
  }
}

export async function handleWebhook(req: Request, res: Response): Promise<void> {
  try {
    const { event, payload } = req.body;

    if (!event || !payload) {
      errorResponse(res, 'Invalid webhook payload', {}, 400);
      return;
    }

    await paymentsService.handlePaymentWebhook(event, payload);

    successResponse(res, {}, 'Webhook processed');
  } catch (error) {
    errorResponse(res, 'Error processing webhook', {}, 500);
  }
}
