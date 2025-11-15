// Shared auth types and utilities
export type UserRole = 'customer' | 'admin' | 'partner';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

// Auth helpers can be added here
export const isAdmin = (role: UserRole): boolean => role === 'admin';
export const isPartner = (role: UserRole): boolean => role === 'partner';
export const isCustomer = (role: UserRole): boolean => role === 'customer';

