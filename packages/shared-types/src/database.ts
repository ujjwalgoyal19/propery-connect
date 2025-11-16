/**
 * Database Type Definitions
 *
 * NOTE: These types are primarily used for API contracts and shared between frontend and backend.
 * The backend now uses Prisma ORM for database operations which generates its own types.
 * For backend-specific usage, consider importing types from @prisma/client:
 *
 *   import type { User, Listing, Token, Payment, Message } from '@prisma/client'
 *
 * These interfaces are maintained for frontend compatibility and API type consistency.
 */

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  category: 'apartment' | 'house' | 'commercial' | 'land' | 'other';
  images: string[];
  contact_phone: string;
  contact_email?: string;
  amenities?: string[];
  status: 'active' | 'inactive' | 'sold';
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  phone: string;
  email?: string;
  created_at: string;
}

export interface Token {
  id: string;
  token: string;
  user_id: string;
  listing_id?: string;
  expires_at: string;
  created_at: string;
}

export interface Payment {
  id: string;
  listing_id?: string;
  user_id: string;
  order_id: string;
  payment_id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  listing_id?: string;
  sender: string;
  recipient: string;
  message: string;
  message_sid?: string;
  status: 'sent' | 'delivered' | 'failed';
  sent_at: string;
}

/**
 * Table name constants
 * @deprecated Prisma ORM handles table names internally through model mapping
 * These constants are kept for backward compatibility during transition period
 */
export const TABLE_NAMES = {
  USERS: 'users',
  LISTINGS: 'listings',
  TOKENS: 'tokens',
  PAYMENTS: 'payments',
  MESSAGES: 'messages',
} as const;
