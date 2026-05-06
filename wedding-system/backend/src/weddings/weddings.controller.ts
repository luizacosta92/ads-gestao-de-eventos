// src/weddings/weddings.controller.ts
import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { WeddingsService } from './weddings.service';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';

@ApiTags('Casamentos')
@Controller('weddings')
export class WeddingsController {
  constructor(private readonly weddingsService: WeddingsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar novo casamento' })
  @ApiResponse({ status: 201, description: 'Casamento criado com sucesso.' })
  create(@Body() dto: CreateWeddingDto) {
    return this.weddingsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os casamentos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
  ) {
    return this.weddingsService.findAll(+page, +limit, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar casamento por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.weddingsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar casamento' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWeddingDto,
  ) {
    return this.weddingsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir casamento' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.weddingsService.remove(id);
  }
}
