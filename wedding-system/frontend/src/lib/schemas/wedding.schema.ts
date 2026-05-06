// src/lib/schemas/wedding.schema.ts
import { z } from 'zod';

export const weddingSchema = z.object({
  bride_name: z.string().min(2, 'Nome da noiva obrigatório').max(150),
  groom_name: z.string().min(2, 'Nome do noivo obrigatório').max(150),
  couple_email: z.string().email('E-mail inválido'),
  couple_phone: z.string().min(8, 'Telefone inválido').max(20),
  wedding_date: z.string().min(1, 'Data do casamento obrigatória'),
  venue: z.string().min(3, 'Local obrigatório').max(300),
  city: z.string().min(2, 'Cidade obrigatória').max(100),
  state: z.string().length(2, 'UF deve ter 2 letras').toUpperCase(),
  estimated_guests: z.coerce.number().min(0, 'Número inválido'),
  total_budget: z.coerce.number().min(0, 'Orçamento inválido'),
  status: z.enum(['PLANNING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  notes: z.string().optional(),
});

export type WeddingSchema = z.infer<typeof weddingSchema>;
