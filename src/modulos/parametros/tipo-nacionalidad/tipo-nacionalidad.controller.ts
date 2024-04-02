import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TipoNacionalidadService } from './tipo-nacionalidad.service';
import { CreateTipoNacionalidadDto } from './dto/create-tipo-nacionalidad.dto';
import { UpdateTipoNacionalidadDto } from './dto/update-tipo-nacionalidad.dto';

import { TipoNacionalidad } from "../../../entities/TipoNacionalidad";
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Parametros - Tipo Nacionalidad')
@Controller('tipo-nacionalidad')
export class TipoNacionalidadController {
  constructor(private readonly tipoNacionalidadService: TipoNacionalidadService) {}

  @Post()
  create(@Body() createTipoNacionalidadDto: CreateTipoNacionalidadDto) {
    return this.tipoNacionalidadService.create(createTipoNacionalidadDto);
  }

  @Get()
  findAll() {
    return this.tipoNacionalidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoNacionalidadService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTipoNacionalidadDto: UpdateTipoNacionalidadDto) {
    return this.tipoNacionalidadService.update(+id, updateTipoNacionalidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoNacionalidadService.remove(+id);
  }
}
