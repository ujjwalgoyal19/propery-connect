import { PrismaClient } from '@prisma/client';

import { env } from '@/config/env';
import { log } from '@/utils/logger';

// Prevent multiple instances of PrismaClient in development
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Add event handlers for connection lifecycle in development
if (env.NODE_ENV === 'development') {
  prisma.$on('query', (e: { query: string; params: unknown; duration: number }) => {
    log.info(`Query: ${e.query}`);
    log.info(`Params: ${e.params}`);
    log.info(`Duration: ${e.duration}ms`);
  });
}

prisma.$on('error', (e: { message: string }) => {
  log.error(`PrismaClient Error: ${e.message}`);
});

prisma.$on('warn', (e: { message: string }) => {
  log.warn(`PrismaClient Warning: ${e.message}`);
});

// Export disconnect function for graceful shutdown
export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
  log.info('Prisma Client disconnected');
}

export default prisma;
