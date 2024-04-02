import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TipoMembresiaService } from './tipo-membresia.service';
import { CreateTipoMembresiaDto } from './dto/create-tipo-membresia.dto';
import { UpdateTipoMembresiaDto } from './dto/update-tipo-membresia.dto';

import {TipoMembresia } from "../../../entities/TipoMembresia";
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Parametros - Tipo Membresia')
@Controller('tipo-membresia')
export class TipoMembresiaController {
  constructor(private readonly tipoMembresiaService: TipoMembresiaService) {}

  @Post()
  create(@Body() createTipoMembresiaDto: CreateTipoMembresiaDto) {
    return this.tipoMembresiaService.create(createTipoMembresiaDto);
  }

  @Get()
  findAll() {
    return this.tipoMembresiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoMembresiaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTipoMembresiaDto: UpdateTipoMembresiaDto) {
    return this.tipoMembresiaService.update(+id, updateTipoMembresiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoMembresiaService.remove(+id);
  }
}
