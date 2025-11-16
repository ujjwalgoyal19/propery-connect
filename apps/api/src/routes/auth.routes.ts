import { Router } from 'express';

import * as authController from '@/controllers/auth.controller';

const router = Router();

router.post('/generate-link', authController.generateManagementLink);
router.post('/verify-token', authController.verifyToken);

export default router;
