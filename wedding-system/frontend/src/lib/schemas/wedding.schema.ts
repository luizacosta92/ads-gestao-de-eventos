// src/lib/schemas/wedding.schema.ts
import { z } from 'zod';
import { createVendorFieldSchema } from './vendor-field.schema';

const normalizeBudgetInput = (value: unknown) => {
  if (value === '' || value === null || value === undefined) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return value;

  const digits = value.replace(/[^\d]/g, '');
  if (!digits) return value;

  return Number(digits);
};

/**
 * Schemas do wizard de cadastro de casamento.
 *
 *  - coupleSchema → 1ª tela (todos os campos OBRIGATÓRIOS)
 *  - eventSchema  → 2ª tela (todos os campos OPCIONAIS — podem ser preenchidos depois)
 *  - weddingSchema → união dos dois, usado no submit final
 */

// 1ª etapa — Casal
export const coupleSchema = z.object({
  bride_name: z
    .string()
    .min(1, 'Nome da noiva é obrigatório')
    .min(2, 'Nome da noiva deve ter pelo menos 2 caracteres')
    .max(150, 'Nome da noiva muito longo'),
  groom_name: z
    .string()
    .min(1, 'Nome do noivo é obrigatório')
    .min(2, 'Nome do noivo deve ter pelo menos 2 caracteres')
    .max(150, 'Nome do noivo muito longo'),
  couple_email: z.string().email('E-mail inválido'),
  couple_phone: z.string().min(8, 'Telefone inválido').max(20),
});

export type CoupleSchema = z.infer<typeof coupleSchema>;

// 2ª etapa — Evento (todos opcionais)
export const eventSchema = z.object({
  wedding_date: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((value) => {
      if (!value) return true;
      const selectedDate = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'A data do casamento não pode ser no passado'),
  venue: createVendorFieldSchema('ESPACO'),
  buffet_vendor: createVendorFieldSchema('BUFFET'),
  photography_vendor: createVendorFieldSchema('FOTOGRAFIA'),
  video_vendor: createVendorFieldSchema('VIDEO'),
  decoracao_vendor: createVendorFieldSchema('DECORACAO'),
  musica_vendor: createVendorFieldSchema('MUSICA'),
  bolo_vendor: createVendorFieldSchema('BOLO'),
  bebidas_vendor: createVendorFieldSchema('BEBIDAS'),
  convites_vendor: createVendorFieldSchema('CONVITES'),
  lembrancinhas_vendor: createVendorFieldSchema('LEMBRANCINHAS'),
  beleza_vendor: createVendorFieldSchema('BELEZA'),
  celebrante_vendor: createVendorFieldSchema('CELEBRANTE'),
  transporte_vendor: createVendorFieldSchema('TRANSPORTE'),
  city: z.string().max(100).optional().or(z.literal('')),
  state: z
    .string()
    .max(2)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v ? v.toUpperCase() : v)),
  estimated_guests: z.coerce.number().min(0, 'Número inválido').optional(),
  total_budget: z.preprocess(
    normalizeBudgetInput,
    z.number().min(0, 'Orçamento inválido').optional(),
  ),
  status: z.enum(['PLANNING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  notes: z.string().optional().or(z.literal('')),
});

export type EventSchema = z.infer<typeof eventSchema>;

// Schema completo — usado no submit final
export const weddingSchema = coupleSchema.merge(eventSchema);
export type WeddingSchema = z.infer<typeof weddingSchema>;
