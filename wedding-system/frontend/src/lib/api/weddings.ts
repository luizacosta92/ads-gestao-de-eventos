// src/lib/api/weddings.ts
import { Wedding, WeddingFormData, PaginatedResponse } from '@/types/wedding';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const weddingsApi = {
  list: async (page = 1, limit = 10, search?: string): Promise<PaginatedResponse<Wedding>> => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set('search', search);
    const res = await fetch(`${API_URL}/weddings?${params}`);
    return handleResponse(res);
  },

  get: async (id: number): Promise<Wedding> => {
    const res = await fetch(`${API_URL}/weddings/${id}`);
    return handleResponse(res);
  },

  create: async (data: WeddingFormData): Promise<Wedding> => {
    const res = await fetch(`${API_URL}/weddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  update: async (id: number, data: Partial<WeddingFormData>): Promise<Wedding> => {
    const res = await fetch(`${API_URL}/weddings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  remove: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/weddings/${id}`, { method: 'DELETE' });
    return handleResponse(res);
  },
};
