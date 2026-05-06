'use client';
// src/app/casamentos/[id]/editar/page.tsx

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { WeddingForm } from '@/components/weddings/wedding-form';
import { useWedding, useUpdateWedding } from '@/hooks/use-weddings';
import { WeddingSchema } from '@/lib/schemas/wedding.schema';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export default function EditWeddingPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { data: wedding, isLoading } = useWedding(id);
  const { mutateAsync, isPending } = useUpdateWedding(id);

  const handleSubmit = async (data: WeddingSchema) => {
    await mutateAsync(data as any);
    router.push('/casamentos');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <p className="text-gray-400">Carregando...</p>
      </div>
    );
  }

  if (!wedding) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <p className="text-red-500">Casamento não encontrado.</p>
        <Link href="/casamentos"><Button variant="outline" className="mt-4">Voltar</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-6">
        <Link href="/casamentos">
          <Button variant="ghost" className="gap-2 text-gray-600 pl-0">
            <ArrowLeftIcon className="w-4 h-4" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          Editar: {wedding.bride_name} & {wedding.groom_name}
        </h1>
        <p className="text-gray-500 mt-1">Atualize os dados do casamento</p>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <WeddingForm defaultValues={wedding} onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </div>
  );
}
