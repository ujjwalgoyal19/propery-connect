import { type CreateListingInput, type Listing } from '@propery-connect/shared-types';

import prisma from '@/lib/prisma';

export async function createListing(
  data: CreateListingInput & { user_id: string }
): Promise<Listing> {
  const listing = await prisma.listing.create({
    data: {
      userId: data.user_id,
      title: data.title,
      description: data.description,
      price: data.price as unknown as Record<string, unknown>,
      location: data.location,
      category: data.category,
      images: data.images || [],
      contactPhone: data.contact_phone,
      contactEmail: data.contact_email,
      amenities: data.amenities,
      status: 'active',
    },
  });

  return mapListingToLegacyFormat(listing);
}

export async function getListingById(id: string): Promise<Listing | null> {
  const listing = await prisma.listing.findFirst({
    where: {
      id,
      status: 'active',
    },
  });

  return listing ? mapListingToLegacyFormat(listing) : null;
}

export async function getListings(
  page = 1,
  limit = 10,
  filters?: Record<string, unknown>
): Promise<{ listings: Listing[]; total: number }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { status: 'active' };

  if (filters?.category) {
    where.category = filters.category;
  }
  if (filters?.location) {
    where.location = {
      contains: filters.location as string,
      mode: 'insensitive',
    };
  }
  if (filters?.minPrice) {
    where.price = { gte: filters.minPrice as unknown as Record<string, unknown> };
  }
  if (filters?.maxPrice) {
    if (where.price) {
      (where.price as Record<string, unknown>).lte = filters.maxPrice as unknown as Record<
        string,
        unknown
      >;
    } else {
      where.price = { lte: filters.maxPrice as unknown as Record<string, unknown> };
    }
  }

  const offset = (page - 1) * limit;

  const [listings, total] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    }),
    prisma.listing.count({ where }),
  ]);

  return { listings: listings.map(mapListingToLegacyFormat), total };
}

export async function updateListing(id: string, data: Partial<Listing>): Promise<Listing> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = {};

  if (data.title) updateData.title = data.title;
  if (data.description) updateData.description = data.description;
  if (data.price) updateData.price = data.price as unknown as Record<string, unknown>;
  if (data.location) updateData.location = data.location;
  if (data.category) updateData.category = data.category;
  if (data.images) updateData.images = data.images;
  if (data.contact_phone) updateData.contactPhone = data.contact_phone;
  if (data.contact_email) updateData.contactEmail = data.contact_email;
  if (data.amenities) updateData.amenities = data.amenities;
  if (data.status) updateData.status = data.status;

  try {
    const listing = await prisma.listing.update({
      where: { id },
      data: updateData,
    });
    return mapListingToLegacyFormat(listing);
  } catch (error) {
    if ((error as Record<string, unknown>).code === 'P2025') {
      throw new Error('Listing not found');
    }
    throw error;
  }
}

export async function deleteListing(id: string): Promise<void> {
  // Soft delete by updating status to inactive
  await prisma.listing.update({
    where: { id },
    data: { status: 'inactive' },
  });
}

// Helper function to map Prisma listing to legacy format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapListingToLegacyFormat(listing: any): Listing {
  const priceValue = listing.price as unknown as Record<string, unknown>;
  let price: number;

  if (typeof priceValue === 'object' && priceValue !== null && 'toNumber' in priceValue) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    price = (priceValue as any).toNumber();
  } else {
    price = priceValue as unknown as number;
  }

  return {
    id: listing.id,
    user_id: listing.userId,
    title: listing.title,
    description: listing.description ?? undefined,
    price,
    location: listing.location,
    category: listing.category as 'apartment' | 'house' | 'commercial' | 'land' | 'other',
    images: listing.images,
    contact_phone: listing.contactPhone ?? undefined,
    contact_email: listing.contactEmail ?? undefined,
    amenities: listing.amenities,
    status: listing.status as 'active' | 'inactive' | 'sold',
    created_at: listing.createdAt.toISOString(),
    updated_at: listing.updatedAt.toISOString(),
  };
}
