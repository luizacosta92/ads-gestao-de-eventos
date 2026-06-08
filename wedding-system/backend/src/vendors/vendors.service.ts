// src/vendors/vendors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateVendorDto) {
    return this.prisma.vendor.create({ data: dto });
  }

  async findAll(page = 1, limit = 10, search?: string, category?: string) {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (category) {
      where.service_category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { service_category: { contains: search, mode: 'insensitive' as const } },
        { city: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.vendor.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      this.prisma.vendor.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const vendor = await this.prisma.vendor.findUnique({ where: { id } });
    if (!vendor) throw new NotFoundException(`Fornecedor #${id} não encontrado`);
    return vendor;
  }

  async update(id: number, dto: UpdateVendorDto) {
    await this.findOne(id);
    return this.prisma.vendor.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.vendor.delete({ where: { id } });
  }

  /**
   * Lista as categorias distintas em uso — útil para dropdowns no front.
   */
  async listCategories() {
    const rows = await this.prisma.vendor.findMany({
      select: { service_category: true },
      distinct: ['service_category'],
      orderBy: { service_category: 'asc' },
    });
    return rows.map((r) => r.service_category);
  }
}
