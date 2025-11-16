import type { NextFunction, Request, Response } from 'express';

import { log } from '@/utils/logger';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;

    if (!token || typeof token !== 'string') {
      res.status(401).json({
        status: 'error',
        message: 'Unauthorized',
      });
      return;
    }

    // TODO: Validate token
    req.userId = 'user-id'; // Replace with actual validation

    next();
  } catch (error) {
    log.error(`Auth middleware error: ${error}`);
    res.status(500).json({
      status: 'error',
      message: 'Authentication failed',
    });
  }
}
