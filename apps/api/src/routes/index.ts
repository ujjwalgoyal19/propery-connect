import { Router } from 'express';

import authRoutes from './auth.routes';
import listingsRoutes from './listings.routes';
import paymentsRoutes from './payments.routes';
import whatsappRoutes from './whatsapp.routes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount route modules
router.use('/auth', authRoutes);
router.use('/listings', listingsRoutes);
router.use('/payments', paymentsRoutes);
router.use('/whatsapp', whatsappRoutes);

export default router;
