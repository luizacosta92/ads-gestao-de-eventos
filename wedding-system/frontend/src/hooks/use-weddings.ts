// src/hooks/use-weddings.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { weddingsApi } from '@/lib/api/weddings';
import { WeddingFormData } from '@/types/wedding';
import { toast } from 'sonner';

const QUERY_KEY = 'weddings';

export function useWeddings(page = 1, limit = 10, search?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, page, limit, search],
    queryFn: () => weddingsApi.list(page, limit, search),
  });
}

export function useWedding(id: number) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => weddingsApi.get(id),
    enabled: !!id,
  });
}

export function useCreateWedding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WeddingFormData) => weddingsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success('Casamento cadastrado com sucesso!');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateWedding(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<WeddingFormData>) => weddingsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success('Casamento atualizado!');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteWedding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => weddingsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success('Casamento removido.');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
