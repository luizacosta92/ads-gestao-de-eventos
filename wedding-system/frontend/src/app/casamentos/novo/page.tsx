'use client';
// src/app/casamentos/novo/page.tsx

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { WeddingForm } from '@/components/weddings/wedding-form';
import { useCreateWedding } from '@/hooks/use-weddings';
import { WeddingSchema } from '@/lib/schemas/wedding.schema';
import { ArrowLeft } from 'lucide-react';

export default function NewWeddingPage() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateWedding();

  const handleSubmit = async (data: WeddingSchema) => {
    await mutateAsync(data as any);
    router.push('/casamentos');
  };

  return (
    <div className="screen enter">
      <Link href="/casamentos" className="btn btn-ghost" style={{ paddingLeft: 6, marginBottom: 14 }}>
        <ArrowLeft size={16} /> Cancelar
      </Link>

      <div style={{ textAlign: 'center', marginBottom: 26 }}>
        <div className="eyebrow" style={{ textAlign: 'center' }}>
          Novo projeto
        </div>
        <h1 className="page-title" style={{ fontSize: 40 }}>
          Cadastrar casamento
        </h1>
      </div>

      <div className="form-card">
        <div className="card" style={{ padding: 28 }}>
          <WeddingForm onSubmit={handleSubmit} isLoading={isPending} />
        </div>
      </div>
    </div>
  );
}
