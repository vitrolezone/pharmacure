// Application constants

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PACKED: 'PACKED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;

export const PRESCRIPTION_STATUS = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
} as const;

export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  PARTNER: 'partner',
} as const;

// Pagination defaults
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

// File upload limits
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

// Delivery estimates (in minutes)
export const DEFAULT_DELIVERY_TIME = 30;
export const MAX_DELIVERY_TIME = 120;

// Price comparison
export const PRICE_COMPARISON_RADIUS = 50; // km

