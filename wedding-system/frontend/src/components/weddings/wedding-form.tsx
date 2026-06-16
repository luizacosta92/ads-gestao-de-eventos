'use client';
// src/components/weddings/wedding-form.tsx
//
// Wizard de 2 etapas para cadastro / edição de casamento:
//   Etapa 1 — Casal       (todos os campos OBRIGATÓRIOS)
//   Etapa 2 — Evento      (todos os campos OPCIONAIS — podem ser preenchidos depois)

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  coupleSchema, CoupleSchema,
  eventSchema, EventSchema,
  WeddingSchema,
} from '@/lib/schemas/wedding.schema';
import { Wedding } from '@/types/wedding';
import { Input } from '@/components/ui/input';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { ArrowLeftIcon, ArrowRightIcon, HeartIcon } from 'lucide-react';
import { WeddingEventDetailsFields } from '@/components/weddings/wedding-event-details-fields';
import { WeddingVendorFields } from '@/components/weddings/wedding-vendor-fields';

interface WeddingFormProps {
  defaultValues?: Partial<Wedding>;
  onSubmit: (data: WeddingSchema) => void;
  isLoading?: boolean;
  /** quando true, mostra "Atualizar Casamento" no botão final */
  isEditing?: boolean;
}

type Step = 1 | 2;

export function WeddingForm({ defaultValues, onSubmit, isLoading, isEditing }: WeddingFormProps) {
  const [step, setStep] = useState<Step>(1);

  // ---- Etapa 1: Casal (sempre obrigatório) ----
  const coupleForm = useForm<CoupleSchema>({
    resolver: zodResolver(coupleSchema),
    defaultValues: {
      bride_name: defaultValues?.bride_name ?? '',
      groom_name: defaultValues?.groom_name ?? '',
      couple_email: defaultValues?.couple_email ?? '',
      couple_phone: defaultValues?.couple_phone ?? '',
    },
  });

  // ---- Etapa 2: Evento (opcional) ----
  const eventForm = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      wedding_date: defaultValues?.wedding_date?.slice(0, 10) ?? '',
      venue: defaultValues?.venue ?? '',
      buffet_vendor: defaultValues?.buffet_vendor ?? '',
      photography_vendor: defaultValues?.photography_vendor ?? '',
      video_vendor: defaultValues?.video_vendor ?? '',
      decoracao_vendor: defaultValues?.decoracao_vendor ?? '',
      musica_vendor: defaultValues?.musica_vendor ?? '',
      bolo_vendor: defaultValues?.bolo_vendor ?? '',
      bebidas_vendor: defaultValues?.bebidas_vendor ?? '',
      convites_vendor: defaultValues?.convites_vendor ?? '',
      lembrancinhas_vendor: defaultValues?.lembrancinhas_vendor ?? '',
      beleza_vendor: defaultValues?.beleza_vendor ?? '',
      celebrante_vendor: defaultValues?.celebrante_vendor ?? '',
      transporte_vendor: defaultValues?.transporte_vendor ?? '',
      city: defaultValues?.city ?? '',
      state: defaultValues?.state ?? '',
      estimated_guests: defaultValues?.estimated_guests ?? 0,
      total_budget: defaultValues?.total_budget ?? undefined,
      status: defaultValues?.status ?? 'PLANNING',
      notes: defaultValues?.notes ?? '',
    },
  });

  // valida etapa 1 e avança
  const goToStep2 = coupleForm.handleSubmit(() => setStep(2));

  // valida etapa 2 e dispara o submit final, combinando os dois forms
  const handleFinalSubmit = eventForm.handleSubmit((eventData) => {
    const coupleData = coupleForm.getValues();

    // Limpa strings vazias para que o backend receba `undefined`
    // (a API trata como "não informado") e não tente validar como string vazia.
    const cleaned: Record<string, unknown> = { ...coupleData };
    for (const [key, value] of Object.entries(eventData)) {
      if (value === '' || value === undefined || value === null) continue;
      cleaned[key] = value;
    }

    onSubmit(cleaned as WeddingSchema);
  });

  return (
    <div className="space-y-6">
      {/* ---------- Stepper visual ---------- */}
      <Stepper currentStep={step} />

      {/* ============ ETAPA 1 — CASAL ============ */}
      {step === 1 && (
        <Form {...coupleForm}>
          <form
            onSubmit={(e) => { e.preventDefault(); goToStep2(); }}
            className="space-y-6"
          >
            <div className="form-note">
              <HeartIcon className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Etapa 1 de 2 — Dados do casal.</strong>{' '}
                Todos os campos abaixo são obrigatórios.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={coupleForm.control} name="bride_name" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome da Noiva <span className="text-rose-600">*</span>
                  </FormLabel>
                  <FormControl><Input placeholder="Maria Silva" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={coupleForm.control} name="groom_name" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome do Noivo <span className="text-rose-600">*</span>
                  </FormLabel>
                  <FormControl><Input placeholder="João Souza" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={coupleForm.control} name="couple_email" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    E-mail do Casal <span className="text-rose-600">*</span>
                  </FormLabel>
                  <FormControl><Input type="email" placeholder="casal@email.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={coupleForm.control} name="couple_phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Telefone / WhatsApp <span className="text-rose-600">*</span>
                  </FormLabel>
                  <FormControl><Input placeholder="(48) 99999-0000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="form-foot">
              <span />
              <button type="submit" className="btn btn-primary">
                Próximo: Infos do Evento
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
        </Form>
      )}

      {/* ============ ETAPA 2 — EVENTO ============ */}
      {step === 2 && (
        <Form {...eventForm}>
          <form
            onSubmit={(e) => { e.preventDefault(); handleFinalSubmit(); }}
            className="space-y-6"
          >
            <WeddingEventDetailsFields control={eventForm.control} />
            <WeddingVendorFields control={eventForm.control} />

            <div className="form-foot">
              <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                <ArrowLeftIcon className="w-4 h-4" />
                Voltar
              </button>
              <button type="submit" disabled={isLoading} className="btn btn-primary">
                {isLoading ? 'Salvando...' : isEditing ? 'Atualizar Casamento' : 'Salvar Casamento'}
              </button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

// =====================================================================
// Stepper visual no topo do wizard
// =====================================================================
function Stepper({ currentStep }: { currentStep: Step }) {
  return (
    <div className="stepper">
      <div className={'step-badge ' + (currentStep === 1 ? 'active' : currentStep > 1 ? 'done' : '')}>
        <span className="n">{currentStep > 1 ? '✓' : 1}</span> Casal
      </div>
      <div className="step-line" style={{ ['--p' as any]: currentStep > 1 ? '100%' : '0%' }} />
      <div className={'step-badge ' + (currentStep === 2 ? 'active' : '')}>
        <span className="n">2</span> Evento
      </div>
    </div>
  );
}
