'use client';
// src/components/weddings/wedding-form.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { weddingSchema, WeddingSchema } from '@/lib/schemas/wedding.schema';
import { Wedding, WEDDING_STATUS_LABELS } from '@/types/wedding';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface WeddingFormProps {
  defaultValues?: Partial<Wedding>;
  onSubmit: (data: WeddingSchema) => void;
  isLoading?: boolean;
}

export function WeddingForm({ defaultValues, onSubmit, isLoading }: WeddingFormProps) {
  const form = useForm<WeddingSchema>({
    resolver: zodResolver(weddingSchema),
    defaultValues: {
      bride_name: defaultValues?.bride_name ?? '',
      groom_name: defaultValues?.groom_name ?? '',
      couple_email: defaultValues?.couple_email ?? '',
      couple_phone: defaultValues?.couple_phone ?? '',
      wedding_date: defaultValues?.wedding_date?.slice(0, 10) ?? '',
      venue: defaultValues?.venue ?? '',
      city: defaultValues?.city ?? '',
      state: defaultValues?.state ?? '',
      estimated_guests: defaultValues?.estimated_guests ?? 0,
      total_budget: defaultValues?.total_budget ?? 0,
      status: defaultValues?.status ?? 'PLANNING',
      notes: defaultValues?.notes ?? '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Casal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="bride_name" render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Noiva</FormLabel>
              <FormControl><Input placeholder="Maria Silva" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="groom_name" render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Noivo</FormLabel>
              <FormControl><Input placeholder="João Souza" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="couple_email" render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail do Casal</FormLabel>
              <FormControl><Input type="email" placeholder="casal@email.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="couple_phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone/WhatsApp</FormLabel>
              <FormControl><Input placeholder="(48) 99999-0000" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Evento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField control={form.control} name="wedding_date" render={({ field }) => (
            <FormItem>
              <FormLabel>Data do Casamento</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="estimated_guests" render={({ field }) => (
            <FormItem>
              <FormLabel>Nº de Convidados</FormLabel>
              <FormControl><Input type="number" min={0} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(WEDDING_STATUS_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Local */}
        <FormField control={form.control} name="venue" render={({ field }) => (
          <FormItem>
            <FormLabel>Local / Espaço</FormLabel>
            <FormControl><Input placeholder="Espaço Villa Jardins" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl><Input placeholder="Florianópolis" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="state" render={({ field }) => (
            <FormItem>
              <FormLabel>UF</FormLabel>
              <FormControl><Input placeholder="SC" maxLength={2} {...field} onChange={e => field.onChange(e.target.value.toUpperCase())} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Financeiro */}
        <FormField control={form.control} name="total_budget" render={({ field }) => (
          <FormItem>
            <FormLabel>Orçamento Total Previsto (R$)</FormLabel>
            <FormControl>
              <Input type="number" min={0} step={0.01} placeholder="80000.00" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Observações */}
        <FormField control={form.control} name="notes" render={({ field }) => (
          <FormItem>
            <FormLabel>Observações</FormLabel>
            <FormControl>
              <Textarea rows={3} placeholder="Tema, preferências, informações adicionais..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="submit" disabled={isLoading} className="bg-rose-600 hover:bg-rose-700 text-white">
            {isLoading ? 'Salvando...' : 'Salvar Casamento'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
