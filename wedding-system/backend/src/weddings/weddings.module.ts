// src/weddings/weddings.module.ts
import { Module } from '@nestjs/common';
import { WeddingsService } from './weddings.service';
import { WeddingsController } from './weddings.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WeddingsController],
  providers: [WeddingsService],
})
export class WeddingsModule {}
