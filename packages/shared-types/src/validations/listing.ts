import { z } from 'zod';

export const createListingSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(10).max(5000).optional(),
  price: z.number().positive(),
  location: z.string().min(3).max(200),
  category: z.enum(['apartment', 'house', 'commercial', 'land', 'other']),
  images: z.array(z.string().url()).max(10),
  contact_phone: z.string().min(10),
  contact_email: z.string().email().optional(),
  amenities: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive', 'sold']).optional(),
  user_id: z.string().optional(),
});

export const updateListingSchema = createListingSchema.partial();

export const listingQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  category: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.number().nonnegative().optional(),
  maxPrice: z.number().positive().optional(),
  search: z.string().optional(),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
export type ListingQuery = z.infer<typeof listingQuerySchema>;
