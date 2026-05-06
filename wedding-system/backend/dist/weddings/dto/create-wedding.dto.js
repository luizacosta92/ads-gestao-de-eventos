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
exports.CreateWeddingDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateWeddingDto {
}
exports.CreateWeddingDto = CreateWeddingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Maria Silva', description: 'Nome da noiva' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateWeddingDto.prototype, "bride_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'João Souza', description: 'Nome do noivo' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateWeddingDto.prototype, "groom_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'casal@email.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateWeddingDto.prototype, "couple_email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '(48) 99999-0000' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateWeddingDto.prototype, "couple_phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-12-15', description: 'Data do casamento (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateWeddingDto.prototype, "wedding_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Espaço Villa Jardins' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], CreateWeddingDto.prototype, "venue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Florianópolis' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateWeddingDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SC' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2),
    __metadata("design:type", String)
], CreateWeddingDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150, description: 'Número estimado de convidados' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateWeddingDto.prototype, "estimated_guests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 80000.00, description: 'Orçamento total previsto' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateWeddingDto.prototype, "total_budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.WeddingStatus, default: client_1.WeddingStatus.PLANNING }),
    (0, class_validator_1.IsEnum)(client_1.WeddingStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWeddingDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Cerimônia ao ar livre, tema provençal.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWeddingDto.prototype, "notes", void 0);
//# sourceMappingURL=create-wedding.dto.js.map