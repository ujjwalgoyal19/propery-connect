import { Router } from 'express';

import * as whatsappController from '@/controllers/whatsapp.controller';
import { rateLimitMiddleware } from '@/middleware/rate-limit';

const router = Router();

router.post('/send', rateLimitMiddleware, whatsappController.sendMessage);
router.post('/webhook', whatsappController.handleWebhook);

export default router;
