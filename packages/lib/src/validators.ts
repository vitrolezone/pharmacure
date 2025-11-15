import { z } from 'zod';

// Email validation
export const emailSchema = z.string().email('Invalid email address');

// Password validation (min 8 chars, at least one letter and one number)
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Za-z]/, 'Password must contain at least one letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

// Phone number validation (basic)
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number');

// Address validation
export const addressSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().default('IN'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// Product search query validation
export const productSearchSchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// Pharmacy location query validation
export const pharmacyLocationSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  radius: z.coerce.number().positive().max(50).default(10), // km
});

