import { Router } from 'express';

import * as paymentsController from '@/controllers/payments.controller';

const router = Router();

router.post('/create-order', paymentsController.createOrder);
router.post('/verify', paymentsController.verifyPayment);
router.post('/webhook', paymentsController.handleWebhook);

export default router;
