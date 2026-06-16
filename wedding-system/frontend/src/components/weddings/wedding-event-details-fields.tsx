'use client';

import { Control } from 'react-hook-form';
import { EventSchema } from '@/lib/schemas/wedding.schema';
import { WEDDING_STATUS_LABELS } from '@/types/wedding';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface WeddingEventDetailsFieldsProps {
  control: Control<EventSchema>;
}

export function WeddingEventDetailsFields({ control }: WeddingEventDetailsFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="form-note opt">
        <span>
          <strong>Etapa 2 de 2 — Infos sobre o evento.</strong>{' '}
          Os campos abaixo são <strong>opcionais</strong> — você pode preenchê-los agora ou depois.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control} name="wedding_date" render={({ field }) => (
          <FormItem>
            <FormLabel>Data do Casamento</FormLabel>
            <FormControl><Input type="date" min={new Date().toLocaleDateString('en-CA')} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="estimated_guests" render={({ field }) => (
          <FormItem>
            <FormLabel>Nº de Convidados</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value === '' ? 0 : e.target.valueAsNumber)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="status" render={({ field }) => (
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <FormField control={control} name="city" render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl><Input placeholder="Florianópolis" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={control} name="state" render={({ field }) => (
          <FormItem>
            <FormLabel>UF</FormLabel>
            <FormControl>
              <Input
                placeholder="SC"
                maxLength={2}
                {...field}
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <FormField control={control} name="total_budget" render={({ field }) => (
        <FormItem>
          <FormLabel>Orçamento Total Previsto (R$)</FormLabel>
          <p className="text-xs text-muted-foreground">
            Use separador de milhar, por exemplo: 150.000 ou 150,000.
          </p>
          <FormControl>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="150.000 ou 150,000"
              value={field.value == null ? '' : String(field.value)}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      <FormField control={control} name="notes" render={({ field }) => (
        <FormItem>
          <FormLabel>Observações</FormLabel>
          <FormControl>
            <Textarea rows={3} placeholder="Tema, preferências, informações adicionais..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}