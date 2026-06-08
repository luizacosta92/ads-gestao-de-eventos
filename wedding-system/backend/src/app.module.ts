// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WeddingsModule } from './weddings/weddings.module';
import { VendorsModule } from './vendors/vendors.module';

@Module({
  imports: [PrismaModule, WeddingsModule, VendorsModule],
})
export class AppModule {}
