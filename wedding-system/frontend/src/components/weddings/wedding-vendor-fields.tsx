'use client';

import { Control } from 'react-hook-form';
import { EventSchema } from '@/lib/schemas/wedding.schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WEDDING_VENDOR_FIELD_CONFIG, getVendorOptionsByCategory } from '@/lib/api/vendors';

interface WeddingVendorFieldsProps {
  control: Control<EventSchema>;
}

export function WeddingVendorFields({ control }: WeddingVendorFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="border-l-4 border-sky-500 bg-sky-50/50 px-4 py-3 rounded">
        <p className="text-sm text-sky-900">
          <strong>Fornecedores do evento.</strong>{' '}
          Cada campo abaixo aceita apenas fornecedores cadastrados na categoria correspondente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WEDDING_VENDOR_FIELD_CONFIG.map((config) => {
          const options = getVendorOptionsByCategory(config.category);

          return (
            <FormField
              key={config.name}
              control={control}
              name={config.name as keyof EventSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{config.label}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={typeof field.value === 'string' ? field.value : ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={config.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
      </div>
    </div>
  );
}