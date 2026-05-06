// src/weddings/weddings.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';

@Injectable()
export class WeddingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateWeddingDto) {
    return this.prisma.wedding.create({
      data: {
        ...dto,
        wedding_date: new Date(dto.wedding_date),
      },
    });
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { bride_name: { contains: search, mode: 'insensitive' as const } },
            { groom_name: { contains: search, mode: 'insensitive' as const } },
            { venue: { contains: search, mode: 'insensitive' as const } },
            { city: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.wedding.findMany({
        where,
        skip,
        take: limit,
        orderBy: { wedding_date: 'asc' },
      }),
      this.prisma.wedding.count({ where }),
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
    const wedding = await this.prisma.wedding.findUnique({ where: { id } });
    if (!wedding) throw new NotFoundException(`Casamento #${id} não encontrado`);
    return wedding;
  }

  async update(id: number, dto: UpdateWeddingDto) {
    await this.findOne(id);

    const data: any = { ...dto };
    if (dto.wedding_date) {
      data.wedding_date = new Date(dto.wedding_date);
    }

    return this.prisma.wedding.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.wedding.delete({ where: { id } });
  }
}
