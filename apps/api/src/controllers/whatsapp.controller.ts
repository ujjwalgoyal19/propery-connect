import type { Request, Response } from 'express';

import * as whatsappService from '@/services/whatsapp.service';
import { errorResponse, successResponse } from '@/utils/response';

export async function sendMessage(req: Request, res: Response): Promise<void> {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      errorResponse(res, 'Missing required fields (to, message)', {}, 400);
      return;
    }

    const { messageSid } = await whatsappService.sendWhatsAppMessage(to, message);

    successResponse(res, { messageSid }, 'Message sent', 201);
  } catch (error) {
    errorResponse(res, 'Error sending message', {}, 500);
  }
}

export async function handleWebhook(req: Request, res: Response): Promise<void> {
  try {
    const { MessageSid, MessageStatus } = req.body;

    if (MessageSid && MessageStatus) {
      await whatsappService.updateMessageStatus(
        MessageSid,
        MessageStatus as 'sent' | 'delivered' | 'failed'
      );
    }

    res.json({ status: 'success', message: 'Webhook processed' });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error processing webhook',
    });
  }
}
