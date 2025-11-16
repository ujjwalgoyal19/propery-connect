import { env } from '@/config/env';
import twilio from '@/config/twilio';
import prisma from '@/lib/prisma';

export async function sendWhatsAppMessage(
  to: string,
  message: string
): Promise<{ messageSid: string }> {
  const msg = await twilio.messages.create({
    body: message,
    from: env.TWILIO_WHATSAPP_NUMBER,
    to: `whatsapp:+${to}`,
  });

  await prisma.message.create({
    data: {
      sender: env.TWILIO_WHATSAPP_NUMBER,
      recipient: to,
      message,
      messageSid: msg.sid,
      status: 'sent',
    },
  });

  return { messageSid: msg.sid };
}

export async function updateMessageStatus(
  messageSid: string,
  status: 'sent' | 'delivered' | 'failed'
): Promise<void> {
  await prisma.message.updateMany({
    where: { messageSid },
    data: { status },
  });
}

export async function logMessage(
  listingId: string,
  sender: string,
  recipient: string,
  message: string
): Promise<void> {
  await prisma.message.create({
    data: {
      listingId,
      sender,
      recipient,
      message,
      status: 'sent',
    },
  });
}
