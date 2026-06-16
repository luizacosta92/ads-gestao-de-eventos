'use client';
// src/app/casamentos/[id]/editar/page.tsx

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { WeddingForm } from '@/components/weddings/wedding-form';
import { useWedding, useUpdateWedding } from '@/hooks/use-weddings';
import { WeddingSchema } from '@/lib/schemas/wedding.schema';
import { ArrowLeft } from 'lucide-react';

export default function EditWeddingPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { data: wedding, isLoading } = useWedding(id);
  const { mutateAsync, isPending } = useUpdateWedding(id);

  const handleSubmit = async (data: WeddingSchema) => {
    await mutateAsync(data as any);
    router.push(`/casamentos/${id}`);
  };

  if (isLoading) return <div className="screen">Carregando…</div>;

  if (!wedding) {
    return (
      <div className="screen">
        <p style={{ color: '#a44a3a' }}>Casamento não encontrado.</p>
        <Link href="/casamentos" className="btn btn-outline" style={{ marginTop: 16 }}>
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="screen enter">
      <Link href={`/casamentos/${id}`} className="btn btn-ghost" style={{ paddingLeft: 6, marginBottom: 14 }}>
        <ArrowLeft size={16} /> Cancelar
      </Link>

      <div style={{ textAlign: 'center', marginBottom: 26 }}>
        <div className="eyebrow" style={{ textAlign: 'center' }}>
          Editando projeto
        </div>
        <h1 className="page-title" style={{ fontSize: 40 }}>
          {wedding.bride_name} &amp; {wedding.groom_name}
        </h1>
      </div>

      <div className="form-card">
        <div className="card" style={{ padding: 28 }}>
          <WeddingForm defaultValues={wedding} onSubmit={handleSubmit} isLoading={isPending} isEditing />
        </div>
      </div>
    </div>
  );
}
