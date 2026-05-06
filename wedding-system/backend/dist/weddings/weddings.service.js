"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeddingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WeddingsService = class WeddingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.wedding.create({
            data: {
                ...dto,
                wedding_date: new Date(dto.wedding_date),
            },
        });
    }
    async findAll(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [
                    { bride_name: { contains: search, mode: 'insensitive' } },
                    { groom_name: { contains: search, mode: 'insensitive' } },
                    { venue: { contains: search, mode: 'insensitive' } },
                    { city: { contains: search, mode: 'insensitive' } },
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
    async findOne(id) {
        const wedding = await this.prisma.wedding.findUnique({ where: { id } });
        if (!wedding)
            throw new common_1.NotFoundException(`Casamento #${id} não encontrado`);
        return wedding;
    }
    async update(id, dto) {
        await this.findOne(id);
        const data = { ...dto };
        if (dto.wedding_date) {
            data.wedding_date = new Date(dto.wedding_date);
        }
        return this.prisma.wedding.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.wedding.delete({ where: { id } });
    }
};
exports.WeddingsService = WeddingsService;
exports.WeddingsService = WeddingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WeddingsService);
//# sourceMappingURL=weddings.service.js.map