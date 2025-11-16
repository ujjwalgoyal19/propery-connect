import type { Response } from 'express';

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export function successResponse<T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
): Response {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
}

export function errorResponse(
  res: Response,
  message = 'Error',
  errors?: Record<string, string[]>,
  statusCode = 400
): Response {
  return res.status(statusCode).json({
    status: 'error',
    message,
    errors,
  });
}

export function paginatedResponse<T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number,
  message = 'Success',
  statusCode = 200
): Response {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}
