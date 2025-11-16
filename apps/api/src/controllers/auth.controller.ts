import type { Request, Response } from 'express';

import { generateToken, validateToken } from '@/services/auth.service';

export async function generateManagementLink(req: Request, res: Response): Promise<void> {
  try {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({
        status: 'error',
        message: 'Phone number is required',
      });
      return;
    }

    // TODO: Get or create user
    const userId = 'user-id';

    const { token, expiresAt } = await generateToken(userId);

    res.json({
      status: 'success',
      message: 'Management link generated',
      data: {
        token,
        expiresAt,
        link: `${process.env.FRONTEND_URL}?token=${token}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error generating token',
    });
  }
}

export async function verifyToken(req: Request, res: Response): Promise<void> {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({
        status: 'error',
        message: 'Token is required',
      });
      return;
    }

    const userId = await validateToken(token);

    if (!userId) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid or expired token',
      });
      return;
    }

    res.json({
      status: 'success',
      message: 'Token verified',
      data: { userId },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error verifying token',
    });
  }
}
