import type { Request, Response } from 'express';

import type { AuthenticatedRequest } from '@/middleware/auth';
import * as listingsService from '@/services/listings.service';
import { errorResponse, paginatedResponse, successResponse } from '@/utils/response';

export async function getAllListings(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const filters = {
      category: req.query.category,
      location: req.query.location,
      minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
    };

    const { listings, total } = await listingsService.getListings(page, limit, filters);

    paginatedResponse(res, listings, page, limit, total);
  } catch (_error) {
    errorResponse(res, 'Error fetching listings', {}, 500);
  }
}

export async function getListingById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const listing = await listingsService.getListingById(id);

    if (!listing) {
      errorResponse(res, 'Listing not found', {}, 404);
      return;
    }

    successResponse(res, listing);
  } catch (_error) {
    errorResponse(res, 'Error fetching listing', {}, 500);
  }
}

export async function createListing(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { title, description, price, location, category, images, contact_phone } = req.body;

    const listing = await listingsService.createListing({
      title,
      description,
      price,
      location,
      category,
      images,
      contact_phone,
      user_id: req.userId || 'anonymous',
      status: 'active' as const,
    });

    successResponse(res, listing, 'Listing created', 201);
  } catch (_error) {
    errorResponse(res, 'Error creating listing', {}, 500);
  }
}

export async function updateListing(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updates = req.body;

    const listing = await listingsService.updateListing(id, updates);

    successResponse(res, listing, 'Listing updated');
  } catch (_error) {
    errorResponse(res, 'Error updating listing', {}, 500);
  }
}

export async function deleteListing(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    await listingsService.deleteListing(id);

    res.json({
      status: 'success',
      message: 'Listing deleted',
    });
  } catch (_error) {
    errorResponse(res, 'Error deleting listing', {}, 500);
  }
}
