// src/weddings/weddings.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';

const WEDDING_VENDOR_FIELD_CATEGORIES: Record<string, string> = {
  venue: 'ESPACO',
  buffet_vendor: 'BUFFET',
  photography_vendor: 'FOTOGRAFIA',
  video_vendor: 'VIDEO',
  decoracao_vendor: 'DECORACAO',
  musica_vendor: 'MUSICA',
  bolo_vendor: 'BOLO',
  bebidas_vendor: 'BEBIDAS',
  convites_vendor: 'CONVITES',
  lembrancinhas_vendor: 'LEMBRANCINHAS',
  beleza_vendor: 'BELEZA',
  celebrante_vendor: 'CELEBRANTE',
  transporte_vendor: 'TRANSPORTE',
};

@Injectable()
export class WeddingsService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureVenueIsAllowed(venue?: string | null) {
    if (!venue) return null;

    const normalizedVenue = venue.trim();
    const allowedVenue = await this.prisma.vendor.findFirst({
      where: {
        name: normalizedVenue,
        service_category: 'ESPACO',
        is_active: true,
      },
      select: { id: true },
    });

    if (!allowedVenue) {
      throw new BadRequestException('Selecione um local cadastrado na categoria Espaço');
    }

    return normalizedVenue;
  }

  private async ensureVendorFieldIsAllowed(value: string | null | undefined, category: string, fieldLabel: string) {
    if (!value) return null;

    const normalizedValue = value.trim();
    const allowedVendor = await this.prisma.vendor.findFirst({
      where: {
        name: normalizedValue,
        service_category: category,
        is_active: true,
      },
      select: { id: true },
    });

    if (!allowedVendor) {
      throw new BadRequestException(`Selecione um fornecedor cadastrado na categoria ${fieldLabel}`);
    }

    return normalizedValue;
  }

  private async applyWeddingVendorFields(dto: CreateWeddingDto | UpdateWeddingDto) {
    const data: Record<string, unknown> = {};

    for (const [fieldName, category] of Object.entries(WEDDING_VENDOR_FIELD_CATEGORIES)) {
      if (Object.prototype.hasOwnProperty.call(dto, fieldName)) {
        const value = (dto as Record<string, string | null | undefined>)[fieldName];
        const fieldLabel = fieldName === 'venue' ? 'Espaço' : fieldName.replace(/_/g, ' ');
        data[fieldName] = await this.ensureVendorFieldIsAllowed(value, category, fieldLabel);
      }
    }

    return data;
  }

  private ensureWeddingDateIsNotPast(weddingDate?: string) {
    if (!weddingDate) return null;

    const selectedDate = new Date(`${weddingDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      throw new BadRequestException('A data do casamento não pode ser no passado');
    }

    return selectedDate;
  }

  async create(dto: CreateWeddingDto) {
    return this.prisma.wedding.create({
      data: {
        ...dto,
        // wedding_date é opcional agora; só converte se vier preenchido
        wedding_date: this.ensureWeddingDateIsNotPast(dto.wedding_date),
        ...(await this.applyWeddingVendorFields(dto)),
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
        // wedding_date pode ser null agora — null vai para o final na ordenação asc no Postgres
        orderBy: [{ wedding_date: { sort: 'asc', nulls: 'last' } }, { created_at: 'desc' }],
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
    if (dto.wedding_date !== undefined) {
      data.wedding_date = this.ensureWeddingDateIsNotPast(dto.wedding_date);
    }
    Object.assign(data, await this.applyWeddingVendorFields(dto));

    return this.prisma.wedding.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.wedding.delete({ where: { id } });
  }
}
