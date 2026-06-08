// src/vendors/vendors.controller.ts
import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@ApiTags('Fornecedores')
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar novo fornecedor' })
  @ApiResponse({ status: 201, description: 'Fornecedor criado com sucesso.' })
  create(@Body() dto: CreateVendorDto) {
    return this.vendorsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os fornecedores' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.vendorsService.findAll(+page, +limit, search, category);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Listar categorias distintas de fornecedores' })
  listCategories() {
    return this.vendorsService.listCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar fornecedor por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vendorsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar fornecedor' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVendorDto,
  ) {
    return this.vendorsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir fornecedor' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vendorsService.remove(id);
  }
}
