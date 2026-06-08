// src/weddings/dto/update-wedding.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateWeddingDto } from './create-wedding.dto';

export class UpdateWeddingDto extends PartialType(CreateWeddingDto) {}
