// src/vendors/dto/create-vendor.dto.ts
import { IsString, IsEmail, IsBoolean, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVendorDto {
  @ApiProperty({ example: 'Buffet Sabor & Arte', description: 'Nome do fornecedor' })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  name: string;

  @ApiProperty({
    example: 'BUFFET',
    description: 'Categoria do serviço (BUFFET, FOTOGRAFIA, DECORACAO, MUSICA, BOLO, etc.)',
  })
  @IsString()
  @MaxLength(100)
  service_category: string;

  @ApiPropertyOptional({ example: '12.345.678/0001-90', description: 'CNPJ ou CPF' })
  @IsString()
  @MaxLength(18)
  @IsOptional()
  tax_id?: string;

  @ApiPropertyOptional({ example: '(48) 99999-0000' })
  @IsString()
  @MaxLength(20)
  @IsOptional()
  whatsapp?: string;

  @ApiPropertyOptional({ example: '(48) 3333-4444' })
  @IsString()
  @MaxLength(20)
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'contato@fornecedor.com.br' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'Rua das Flores, 123 — Centro' })
  @IsString()
  @MaxLength(300)
  @IsOptional()
  address?: string;

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

  @ApiPropertyOptional({ example: '@meuestudio | facebook.com/meuestudio' })
  @IsString()
  @IsOptional()
  social_links?: string;

  @ApiPropertyOptional({ example: 'https://meuestudio.com.br' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ example: 'https://drive.google.com/portfolio' })
  @IsString()
  @IsOptional()
  portfolio_urls?: string;

  @ApiPropertyOptional({ example: 'Atende em toda a Grande Florianópolis.' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
