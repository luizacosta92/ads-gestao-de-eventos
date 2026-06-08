import { z } from 'zod';
import { getVendorNamesByCategory, VendorCategory } from '@/lib/api/vendors';

const DEFAULT_VENDOR_ERROR = 'Seleção inválida';

export const createVendorFieldSchema = (category: VendorCategory, message = DEFAULT_VENDOR_ERROR) => {
  const allowedNames = getVendorNamesByCategory(category);

  return z
    .string()
    .max(200)
    .optional()
    .or(z.literal(''))
    .refine((value) => !value || allowedNames.has(value), message);
};