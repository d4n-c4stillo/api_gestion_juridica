import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';

import { TipoDocumento } from "../../../entities/TipoDocumento";
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Parametros - Tipo Documento')
@Controller('tipo-documento')
export class TipoDocumentoController {
  constructor(private readonly tipoDocumentoService: TipoDocumentoService) {}

  @Post()
  create(@Body() createTipoDocumentoDto: CreateTipoDocumentoDto) {
    return this.tipoDocumentoService.create(createTipoDocumentoDto);
  }

  @Get()
  findAll() {
    return this.tipoDocumentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoDocumentoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
    return this.tipoDocumentoService.update(+id, updateTipoDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoDocumentoService.remove(+id);
  }
}
