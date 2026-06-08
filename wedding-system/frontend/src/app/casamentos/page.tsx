'use client';
// src/app/casamentos/page.tsx

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useWeddings, useDeleteWedding } from '@/hooks/use-weddings';
import { WEDDING_STATUS_LABELS, WEDDING_STATUS_COLORS, Wedding } from '@/types/wedding';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { PlusIcon, SearchIcon, PencilIcon, TrashIcon, EyeIcon } from 'lucide-react';

/** Renderiza "—" para qualquer valor null/undefined/string-vazia */
const dash = (v: unknown) => (v === null || v === undefined || v === '' ? '—' : String(v));

export default function WeddingsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Wedding | null>(null);

  const { data, isLoading } = useWeddings(page, 10, search || undefined);
  const deleteMutation = useDeleteWedding();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Casamentos</h1>
          <p className="text-gray-500 mt-1">Gerencie todos os seus projetos de casamento</p>
        </div>
        <Link href="/casamentos/novo">
          <Button className="bg-rose-600 hover:bg-rose-700 text-white gap-2">
            <PlusIcon className="w-4 h-4" />
            Novo Casamento
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar por nome, local, cidade..."
          className="pl-9"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {/* Tabela */}
      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Casal</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Local</TableHead>
              <TableHead className="text-center">Convidados</TableHead>
              <TableHead>Orçamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-gray-400">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-gray-400">
                  Nenhum casamento encontrado.
                </TableCell>
              </TableRow>
            ) : (
              data.data.map(w => (
                <TableRow key={w.id} className="hover:bg-rose-50/30 transition-colors">
                  <TableCell>
                    <div className="font-medium text-gray-900">
                      {w.bride_name} & {w.groom_name}
                    </div>
                    <div className="text-sm text-gray-500">{w.couple_email}</div>
                  </TableCell>
                  <TableCell>
                    {w.wedding_date
                      ? format(new Date(w.wedding_date), 'dd/MM/yyyy', { locale: ptBR })
                      : <span className="text-gray-400">—</span>}
                  </TableCell>
                  <TableCell>
                    <div>{dash(w.venue)}</div>
                    <div className="text-sm text-gray-500">
                      {w.city || w.state
                        ? `${dash(w.city)}/${dash(w.state)}`
                        : ''}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {w.estimated_guests > 0 ? w.estimated_guests : <span className="text-gray-400">—</span>}
                  </TableCell>
                  <TableCell>
                    {w.total_budget != null
                      ? Number(w.total_budget).toLocaleString('pt-BR', {
                          style: 'currency', currency: 'BRL',
                        })
                      : <span className="text-gray-400">—</span>}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${WEDDING_STATUS_COLORS[w.status]}`}>
                      {WEDDING_STATUS_LABELS[w.status]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/casamentos/${w.id}`}>
                        <Button variant="ghost" size="icon" title="Ver detalhes">
                          <EyeIcon className="w-4 h-4 text-gray-500" />
                        </Button>
                      </Link>
                      <Link href={`/casamentos/${w.id}/editar`}>
                        <Button variant="ghost" size="icon" title="Editar">
                          <PencilIcon className="w-4 h-4 text-blue-500" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost" size="icon" title="Excluir"
                        onClick={() => setDeleteTarget(w)}
                      >
                        <TrashIcon className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      {data?.meta && data.meta.lastPage > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>
            Mostrando {((page - 1) * 10) + 1}–{Math.min(page * 10, data.meta.total)} de {data.meta.total}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled={page === data.meta.lastPage} onClick={() => setPage(p => p + 1)}>
              Próxima
            </Button>
          </div>
        </div>
      )}

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o casamento de{' '}
              <strong>{deleteTarget?.bride_name} & {deleteTarget?.groom_name}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
