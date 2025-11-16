import { api } from './client';

export interface ApiListings {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  images: string[];
  contact_phone: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const getListings = (query?: Record<string, unknown>) => {
  const params = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }
  return api.get<ApiListings>(`/listings?${params.toString()}`);
};

export const getListingById = (id: string) => api.get(`/listings/${id}`);

export const createListing = (data: unknown) => api.post('/listings', data);

export const updateListing = (id: string, data: unknown) => api.put(`/listings/${id}`, data);

export const deleteListing = (id: string) => api.delete(`/listings/${id}`);
