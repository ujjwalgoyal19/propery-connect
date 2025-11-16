import { api } from './client';

export const generateManagementLink = (phone: string) => api.post('/auth/generate-link', { phone });

export const verifyToken = (token: string) => api.post('/auth/verify-token', { token });
