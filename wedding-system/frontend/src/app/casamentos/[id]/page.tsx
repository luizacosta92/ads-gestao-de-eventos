'use client';
// src/app/casamentos/[id]/page.tsx

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useWedding, useDeleteWedding } from '@/hooks/use-weddings';
import { WEDDING_STATUS_LABELS, WEDDING_STATUS_COLORS } from '@/types/wedding';
import { Button } from '@/components/ui/button';
import {
  ArrowLeftIcon, PencilIcon, TrashIcon,
  CalendarIcon, MapPinIcon, UsersIcon, WalletIcon, PhoneIcon, MailIcon,
} from 'lucide-react';
import { useState } from 'react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';

function InfoCard({
  icon: Icon, label, value,
}: { icon: any; label: string; value: string | null | undefined }) {
  const display = value && value !== '' ? value : 'Não informado';
  const isEmpty = !value || value === '';
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
      <Icon className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
        <p className={`font-medium mt-0.5 ${isEmpty ? 'text-gray-400 italic' : 'text-gray-900'}`}>
          {display}
        </p>
      </div>
    </div>
  );
}

export default function WeddingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [showDelete, setShowDelete] = useState(false);

  const { data: wedding, isLoading } = useWedding(id);
  const deleteMutation = useDeleteWedding();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id);
    router.push('/casamentos');
  };

  if (isLoading) return <div className="container mx-auto py-8 px-4 text-gray-400">Carregando...</div>;
  if (!wedding) return <div className="container mx-auto py-8 px-4 text-red-500">Casamento não encontrado.</div>;

  // formatadores defensivos — todos os campos do "evento" podem ser null
  const dateValue = wedding.wedding_date
    ? format(new Date(wedding.wedding_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : null;

  const locationValue = wedding.venue || (wedding.city || wedding.state)
    ? [wedding.venue, [wedding.city, wedding.state].filter(Boolean).join('/')]
        .filter((s) => s && s !== '')
        .join(' — ')
    : null;

  const guestsValue = wedding.estimated_guests > 0
    ? `${wedding.estimated_guests} pessoas`
    : null;

  const budgetValue = wedding.total_budget != null
    ? Number(wedding.total_budget).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : null;

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <Link href="/casamentos">
            <Button variant="ghost" className="gap-2 text-gray-600 pl-0 mb-2">
              <ArrowLeftIcon className="w-4 h-4" /> Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {wedding.bride_name} & {wedding.groom_name}
          </h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${WEDDING_STATUS_COLORS[wedding.status]}`}>
            {WEDDING_STATUS_LABELS[wedding.status]}
          </span>
        </div>
        <div className="flex gap-2">
          <Link href={`/casamentos/${id}/editar`}>
            <Button variant="outline" className="gap-2">
              <PencilIcon className="w-4 h-4" /> Editar
            </Button>
          </Link>
          <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50" onClick={() => setShowDelete(true)}>
            <TrashIcon className="w-4 h-4" /> Excluir
          </Button>
        </div>
      </div>

      {/* Casal — sempre presente */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Dados do Casal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <InfoCard icon={MailIcon} label="E-mail do Casal" value={wedding.couple_email} />
        <InfoCard icon={PhoneIcon} label="Telefone / WhatsApp" value={wedding.couple_phone} />
      </div>

      {/* Evento — campos opcionais */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Infos do Evento</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InfoCard icon={CalendarIcon} label="Data do Casamento" value={dateValue} />
        <InfoCard icon={MapPinIcon} label="Local" value={locationValue} />
        <InfoCard icon={UsersIcon} label="Convidados Estimados" value={guestsValue} />
        <InfoCard icon={WalletIcon} label="Orçamento Total" value={budgetValue} />
      </div>

      {/* Observações */}
      {wedding.notes && (
        <div className="bg-white border rounded-lg p-5">
          <h2 className="font-semibold text-gray-700 mb-2">Observações</h2>
          <p className="text-gray-600 whitespace-pre-wrap">{wedding.notes}</p>
        </div>
      )}

      {/* Delete dialog */}
      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o casamento de{' '}
              <strong>{wedding.bride_name} & {wedding.groom_name}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
