import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.flatten().fieldErrors,
        });
        return;
      }
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
      });
    }
  };
}
