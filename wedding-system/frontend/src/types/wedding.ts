// src/types/wedding.ts

export type WeddingStatus = 'PLANNING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export const WEDDING_STATUS_LABELS: Record<WeddingStatus, string> = {
  PLANNING: 'Planejamento',
  CONFIRMED: 'Confirmado',
  IN_PROGRESS: 'Em andamento',
  COMPLETED: 'Realizado',
  CANCELLED: 'Cancelado',
};

export const WEDDING_STATUS_COLORS: Record<WeddingStatus, string> = {
  PLANNING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export interface Wedding {
  id: number;
  // Casal — obrigatórios (etapa 1)
  bride_name: string;
  groom_name: string;
  couple_email: string;
  couple_phone: string;
  // Evento — opcionais (etapa 2)
  wedding_date?: string | null;
  venue?: string | null;
  buffet_vendor?: string | null;
  photography_vendor?: string | null;
  video_vendor?: string | null;
  decoracao_vendor?: string | null;
  musica_vendor?: string | null;
  bolo_vendor?: string | null;
  bebidas_vendor?: string | null;
  convites_vendor?: string | null;
  lembrancinhas_vendor?: string | null;
  beleza_vendor?: string | null;
  celebrante_vendor?: string | null;
  transporte_vendor?: string | null;
  city?: string | null;
  state?: string | null;
  estimated_guests: number;
  total_budget?: number | null;
  status: WeddingStatus;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface WeddingFormData {
  bride_name: string;
  groom_name: string;
  couple_email: string;
  couple_phone: string;
  wedding_date?: string;
  venue?: string;
  buffet_vendor?: string;
  photography_vendor?: string;
  video_vendor?: string;
  decoracao_vendor?: string;
  musica_vendor?: string;
  bolo_vendor?: string;
  bebidas_vendor?: string;
  convites_vendor?: string;
  lembrancinhas_vendor?: string;
  beleza_vendor?: string;
  celebrante_vendor?: string;
  transporte_vendor?: string;
  city?: string;
  state?: string;
  estimated_guests?: number;
  total_budget?: number;
  status?: WeddingStatus;
  notes?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}
