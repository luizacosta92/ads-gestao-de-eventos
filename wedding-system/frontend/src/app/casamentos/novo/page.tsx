'use client';
// src/app/casamentos/novo/page.tsx

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { WeddingForm } from '@/components/weddings/wedding-form';
import { useCreateWedding } from '@/hooks/use-weddings';
import { WeddingSchema } from '@/lib/schemas/wedding.schema';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export default function NewWeddingPage() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateWedding();

  const handleSubmit = async (data: WeddingSchema) => {
    await mutateAsync(data as any);
    router.push('/casamentos');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-6">
        <Link href="/casamentos">
          <Button variant="ghost" className="gap-2 text-gray-600 pl-0">
            <ArrowLeftIcon className="w-4 h-4" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">Novo Casamento</h1>
        <p className="text-gray-500 mt-1">
          Preencha em duas etapas: dados do casal (obrigatórios) e infos sobre o evento (opcionais).
        </p>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <WeddingForm onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </div>
  );
}
