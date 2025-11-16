import type { NextFunction, Request, Response } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error('Error:', err);

  const statusCode =
    typeof (err as unknown as Record<string, unknown>).statusCode === 'number'
      ? ((err as unknown as Record<string, unknown>).statusCode as number)
      : 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message,
    timestamp: new Date().toISOString(),
  });
}
