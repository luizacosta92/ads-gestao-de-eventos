// src/weddings/dto/create-wedding.dto.ts
import { IsString, IsEmail, IsDateString, IsEnum, IsNumber, IsOptional, Min, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WeddingStatus } from '@prisma/client';

export class CreateWeddingDto {
  @ApiProperty({ example: 'Maria Silva', description: 'Nome da noiva' })
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  bride_name: string;

  @ApiProperty({ example: 'João Souza', description: 'Nome do noivo' })
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  groom_name: string;

  @ApiProperty({ example: 'casal@email.com' })
  @IsEmail()
  couple_email: string;

  @ApiProperty({ example: '(48) 99999-0000' })
  @IsString()
  @MaxLength(20)
  couple_phone: string;

  @ApiProperty({ example: '2026-12-15', description: 'Data do casamento (YYYY-MM-DD)' })
  @IsDateString()
  wedding_date: string;

  @ApiProperty({ example: 'Espaço Villa Jardins' })
  @IsString()
  @MaxLength(300)
  venue: string;

  @ApiProperty({ example: 'Florianópolis' })
  @IsString()
  @MaxLength(100)
  city: string;

  @ApiProperty({ example: 'SC' })
  @IsString()
  @MaxLength(2)
  state: string;

  @ApiProperty({ example: 150, description: 'Número estimado de convidados' })
  @IsNumber()
  @Min(0)
  estimated_guests: number;

  @ApiProperty({ example: 80000.00, description: 'Orçamento total previsto' })
  @IsNumber()
  @Min(0)
  total_budget: number;

  @ApiPropertyOptional({ enum: WeddingStatus, default: WeddingStatus.PLANNING })
  @IsEnum(WeddingStatus)
  @IsOptional()
  status?: WeddingStatus;

  @ApiPropertyOptional({ example: 'Cerimônia ao ar livre, tema provençal.' })
  @IsString()
  @IsOptional()
  notes?: string;
}
