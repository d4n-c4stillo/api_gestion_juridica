import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';

import { TipoAreaJuridicaService } from './tipo-area-juridica.service';
import { CreateTipoAreaJuridicaDto } from './dto/create-tipo-area-juridica.dto';
import { UpdateTipoAreaJuridicaDto } from './dto/update-tipo-area-juridica.dto';

import { TipoAreaJuridica } from "../../../entities/TipoAreaJuridica";
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Parametros - Tipo Area Juridica')
@Controller('tipo-area-juridica')
export class TipoAreaJuridicaController {
  constructor(private readonly tipoAreaJuridicaService: TipoAreaJuridicaService) {}

  @Post()
  create(@Body() createTipoAreaJuridicaDto: CreateTipoAreaJuridicaDto) {
    return this.tipoAreaJuridicaService.create(createTipoAreaJuridicaDto);
  }

  @Get()
  findAll() {
    return this.tipoAreaJuridicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoAreaJuridicaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTipoAreaJuridicaDto: UpdateTipoAreaJuridicaDto) {
    return this.tipoAreaJuridicaService.update(+id, updateTipoAreaJuridicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoAreaJuridicaService.remove(+id);
  }
}
