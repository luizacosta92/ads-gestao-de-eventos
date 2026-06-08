// src/weddings/dto/create-wedding.dto.ts
import { IsString, IsEmail, IsDateString, IsEnum, IsNumber, IsOptional, Min, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WeddingStatus } from '@prisma/client';
import { Transform } from 'class-transformer';

const normalizeBudgetValue = (value: unknown) => {
  if (value === '' || value === null || value === undefined) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return value;

  const digits = value.replace(/[^\d]/g, '');
  if (!digits) return value;

  return Number(digits);
};

/**
 * DTO de criação de casamento.
 *
 * Reflete o wizard de 2 telas do front-end:
 *  - Etapa 1 (Casal): TODOS os campos obrigatórios.
 *  - Etapa 2 (Evento): TODOS os campos opcionais — podem ser preenchidos depois.
 */
export class CreateWeddingDto {
  // ===================================================================
  // ETAPA 1 — DADOS DO CASAL (obrigatórios)
  // ===================================================================

  @ApiProperty({ example: 'Maria Silva', description: 'Nome da noiva (obrigatório)' })
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  bride_name: string;

  @ApiProperty({ example: 'João Souza', description: 'Nome do noivo (obrigatório)' })
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  groom_name: string;

  @ApiProperty({ example: 'casal@email.com', description: 'E-mail de contato do casal (obrigatório)' })
  @IsEmail()
  couple_email: string;

  @ApiProperty({ example: '(48) 99999-0000', description: 'Telefone/WhatsApp do casal (obrigatório)' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  couple_phone: string;

  // ===================================================================
  // ETAPA 2 — INFOS SOBRE O EVENTO (opcionais)
  // ===================================================================

  @ApiPropertyOptional({ example: '2026-12-15', description: 'Data do casamento (YYYY-MM-DD)' })
  @IsDateString()
  @IsOptional()
  wedding_date?: string;

  @ApiPropertyOptional({ example: 'Espaço Villa Jardins' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  venue?: string;

  @ApiPropertyOptional({ example: 'Buffet Sabor & Arte' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  buffet_vendor?: string;

  @ApiPropertyOptional({ example: 'Estúdio Luz & Memória' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  photography_vendor?: string;

  @ApiPropertyOptional({ example: 'Bruno Marques Filmes' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  video_vendor?: string;

  @ApiPropertyOptional({ example: 'Florescer Decorações' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  decoracao_vendor?: string;

  @ApiPropertyOptional({ example: 'DJ Rafael Costa' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  musica_vendor?: string;

  @ApiPropertyOptional({ example: 'Confeitaria Doce Verso' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  bolo_vendor?: string;

  @ApiPropertyOptional({ example: 'Open Bar Premium SC' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  bebidas_vendor?: string;

  @ApiPropertyOptional({ example: 'Papelaria Encantada' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  convites_vendor?: string;

  @ApiPropertyOptional({ example: 'Mini Mimo Lembrancinhas' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  lembrancinhas_vendor?: string;

  @ApiPropertyOptional({ example: 'Studio Beauty Day' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  beleza_vendor?: string;

  @ApiPropertyOptional({ example: 'Celebrante Pedro Alencar' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  celebrante_vendor?: string;

  @ApiPropertyOptional({ example: 'Carro Clássico Locações' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  transporte_vendor?: string;

  @ApiPropertyOptional({ example: 'Florianópolis' })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'SC' })
  @IsString()
  @MaxLength(2)
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: 150, description: 'Número estimado de convidados' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  estimated_guests?: number;

  @ApiPropertyOptional({ example: 80000.00, description: 'Orçamento total previsto' })
  @Transform(({ value }) => normalizeBudgetValue(value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  total_budget?: number;

  @ApiPropertyOptional({ enum: WeddingStatus, default: WeddingStatus.PLANNING })
  @IsEnum(WeddingStatus)
  @IsOptional()
  status?: WeddingStatus;

  @ApiPropertyOptional({ example: 'Cerimônia ao ar livre, tema provençal.' })
  @IsString()
  @IsOptional()
  notes?: string;
}
