import { api } from './client';

export const createPaymentOrder = (data: unknown) => api.post('/payments/create-order', data);

export const verifyPayment = (data: unknown) => api.post('/payments/verify', data);
