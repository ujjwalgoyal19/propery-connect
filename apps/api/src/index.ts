import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';

import { env } from '@/config/env';
import { disconnectPrisma } from '@/lib/prisma';
import { errorHandler } from '@/middleware/error-handler';
import apiRoutes from '@/routes';
import { log } from '@/utils/logger';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  log.info(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', apiRoutes);

// Error handler
app.use(errorHandler);

// Start server
const server = app.listen(env.PORT, () => {
  log.info(`Server running on http://localhost:${env.PORT}`);
  log.info(`Environment: ${env.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  log.info('SIGTERM signal received: closing HTTP server and database connections');
  server.close(async () => {
    await disconnectPrisma();
    log.info('HTTP server and database connections closed');
    process.exit(0);
  });
});

// Handle SIGINT for local development (Ctrl+C)
process.on('SIGINT', async () => {
  log.info('SIGINT signal received: closing HTTP server and database connections');
  server.close(async () => {
    await disconnectPrisma();
    log.info('HTTP server and database connections closed');
    process.exit(0);
  });
});

export default app;
