import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function handleValidationErrors(req: Request, res: Response): boolean {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array().reduce(
        (acc, err) => {
          const key = 'path' in err ? err.path : 'unknown';
          if (!acc[key]) acc[key] = [];
          acc[key].push(err.msg);
          return acc;
        },
        {} as Record<string, string[]>
      ),
    });
    return true;
  }
  return false;
}
