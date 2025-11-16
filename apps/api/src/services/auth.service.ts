import { v4 as uuidv4 } from 'uuid';

import prisma from '@/lib/prisma';
import { log } from '@/utils/logger';

export async function generateToken(
  userId: string,
  listingId?: string
): Promise<{ token: string; expiresAt: string }> {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await prisma.token.create({
    data: {
      token,
      userId,
      listingId: listingId || null,
      expiresAt,
    },
  });

  return { token, expiresAt: expiresAt.toISOString() };
}

export async function validateToken(token: string): Promise<string | null> {
  const data = await prisma.token.findUnique({
    where: { token },
  });

  if (!data) return null;

  const expiresAt = new Date(data.expiresAt);

  if (expiresAt < new Date()) {
    // Token expired, delete it
    await prisma.token.delete({
      where: { token },
    });
    return null;
  }

  return data.userId;
}

export async function cleanupExpiredTokens(): Promise<void> {
  try {
    await prisma.token.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  } catch (error) {
    log.error(
      `Error cleaning up expired tokens: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
