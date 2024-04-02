import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';


import { TipoSuscripcionService } from './tipo-suscripcion.service';
import { CreateTipoSuscripcionDto } from './dto/create-tipo-suscripcion.dto';
import { UpdateTipoSuscripcionDto } from './dto/update-tipo-suscripcion.dto';

import { TipoSuscripcion } from "../../../entities/TipoSuscripcion";
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Parametros - Tipo Suscripcion')
@Controller('tipo-suscripcion')
export class TipoSuscripcionController {
  constructor(private readonly tipoSuscripcionService: TipoSuscripcionService) {}

  @Post()
  create(@Body() createTipoSuscripcionDto: CreateTipoSuscripcionDto) {
    console.log('controller :' , createTipoSuscripcionDto);
    return this.tipoSuscripcionService.create(createTipoSuscripcionDto);
  }

  @Get()
  findAll() {
    return this.tipoSuscripcionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoSuscripcionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTipoSuscripcionDto: UpdateTipoSuscripcionDto) {
    return this.tipoSuscripcionService.update(+id, updateTipoSuscripcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoSuscripcionService.remove(+id);
  }
}
