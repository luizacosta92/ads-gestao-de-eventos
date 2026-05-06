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
  bride_name: string;
  groom_name: string;
  couple_email: string;
  couple_phone: string;
  wedding_date: string;
  venue: string;
  city: string;
  state: string;
  estimated_guests: number;
  total_budget: number;
  status: WeddingStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface WeddingFormData {
  bride_name: string;
  groom_name: string;
  couple_email: string;
  couple_phone: string;
  wedding_date: string;
  venue: string;
  city: string;
  state: string;
  estimated_guests: number;
  total_budget: number;
  status: WeddingStatus;
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
