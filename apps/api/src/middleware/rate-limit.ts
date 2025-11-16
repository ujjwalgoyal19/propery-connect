import type { NextFunction, Request, Response } from 'express';

const requestCounts: Record<string, number[]> = {};
const RATE_LIMIT = 10; // requests
const RATE_WINDOW = 60 * 1000; // 1 minute

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || 'unknown';
  const now = Date.now();

  if (!requestCounts[ip]) {
    requestCounts[ip] = [];
  }

  // Clean old requests outside the window
  requestCounts[ip] = requestCounts[ip].filter((timestamp) => now - timestamp < RATE_WINDOW);

  if (requestCounts[ip].length >= RATE_LIMIT) {
    res.status(429).json({
      status: 'error',
      message: 'Too many requests',
    });
    return;
  }

  requestCounts[ip].push(now);
  next();
}
