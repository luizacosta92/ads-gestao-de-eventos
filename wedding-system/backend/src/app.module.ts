// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WeddingsModule } from './weddings/weddings.module';

@Module({
  imports: [PrismaModule, WeddingsModule],
})
export class AppModule {}
