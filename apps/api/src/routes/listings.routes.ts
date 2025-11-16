import { Router } from 'express';

import * as listingsController from '@/controllers/listings.controller';

const router = Router();

router.get('/', listingsController.getAllListings);
router.get('/:id', listingsController.getListingById);
router.post('/', listingsController.createListing);
router.put('/:id', listingsController.updateListing);
router.delete('/:id', listingsController.deleteListing);

export default router;
