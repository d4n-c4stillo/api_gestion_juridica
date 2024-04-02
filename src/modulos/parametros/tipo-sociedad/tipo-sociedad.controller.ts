import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TipoSociedadService } from './tipo-sociedad.service';
import { CreateTipoSociedadDto } from './dto/create-tipo-sociedad.dto';
import { UpdateTipoSociedadDto } from './dto/update-tipo-sociedad.dto';

import { TipoSociedad } from "../../../entities/TipoSociedad";
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Parametros - Tipo Sociedad')
@Controller('tipo-sociedad')
export class TipoSociedadController {
  constructor(private readonly tipoSociedadService: TipoSociedadService) {}

  @Post()
  create(@Body() createTipoSociedadDto: CreateTipoSociedadDto) {
    return this.tipoSociedadService.create(createTipoSociedadDto);
  }

  @Get()
  findAll() {
    return this.tipoSociedadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoSociedadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoSociedadDto: UpdateTipoSociedadDto) {
    return this.tipoSociedadService.update(+id, updateTipoSociedadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoSociedadService.remove(+id);
  }
}
