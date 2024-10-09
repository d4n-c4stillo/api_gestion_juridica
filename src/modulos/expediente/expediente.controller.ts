import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UploadedFile, UseInterceptors, UseGuards, StreamableFile } from '@nestjs/common';

import { ExpedienteService } from './expediente.service';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileName, fileFilter } from '../../helpers/file.utils';

import { createReadStream } from 'fs';
import { join } from 'path';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RespuestaGenericaService } from "../../shared/respuesta.service";
import { CreateExpedienteDocumentoDto } from './dto/create-expediente-documento.dto';
import { CreateExpedientPersonaDto } from './dto/create-expediente-persona.dto';
import { UpdateExpedientePersonaDto } from './dto/update-expediente-persona.dto';
import { CreateExpedientSeguimientoDto } from './dto/create-expediente-seguimiento.dto';

@ApiTags('Expediente Juridico')
@Controller('expediente')
export class ExpedienteController {
  constructor(
    private readonly expedienteService: ExpedienteService,
    private _serviceResp: RespuestaGenericaService,
  ) {}


  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: fileName
    }),
    fileFilter: fileFilter
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file: ', file);
    console.log('..........................');
    //return file ;
    return this._serviceResp.respuestaHttp201(
      file,
      'Archivo Registrado  !',
      ""
    );
  }

  @Get('/tipoSeguimiento')
  getAllTipoSeguimiento() {
    //console.log('here')
    return this.expedienteService.getAllTipoSeguimiento();
  }


  @Post()
  create(@Body() createExpedienteDto: CreateExpedienteDto) {
    return this.expedienteService.create(createExpedienteDto);
  }

  @Get()
  findAll() {
    return this.expedienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expedienteService.findOne(+id);
  }

  @Get('/documentos/:id')
  findDocumentosByExpedienteId(@Param('id') id: string) {
    return this.expedienteService.findDocumentosByExpedienteId(+id);
  }

  @Get('/personas/:id')
  findPersonasByExpedienteId(@Param('id') id: string) {
    return this.expedienteService.findPersonasByExpedienteId(+id);
  }

  
  


  @Post('/documento')
  createDocumento(@Body() createExpedientDocumentoDto: CreateExpedienteDocumentoDto) {
    return this.expedienteService.createDocumento(createExpedientDocumentoDto);
  }

  @Post('/persona')
  createPersona(@Body() createExpedientPersonaDto: CreateExpedientPersonaDto) {
    return this.expedienteService.createPersona(createExpedientPersonaDto);
  }

  @Delete('/persona/:id')
  removePersona(@Param('id') id: string) {
    return this.expedienteService.removePersona(+id);
  }

  @Put('/persona/:id')
  updatePersona(@Param('id') id: string, @Body() updateTipoAreaJuridicaDto: UpdateExpedientePersonaDto) {
    return this.expedienteService.updatePersona(+id, updateTipoAreaJuridicaDto);
  }



  @Get('/seguimiento/:id')
  getAllSeguimientoByExpedienteId(@Param('id') id: string) {
    return this.expedienteService.getAllSeguimientoByExpedienteId(+id);
  }

  @Post('/seguimiento')
  createSeguimiento(@Body() createExpedientSeguimientoDto: CreateExpedientSeguimientoDto) {
    return this.expedienteService.createSeguimiento(createExpedientSeguimientoDto);
  }

  @Delete('/seguimiento/:id')
  removeSeguimiento(@Param('id') id: string) {
    return this.expedienteService.removeSeguimiento(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpedienteDto: UpdateExpedienteDto) {
    return this.expedienteService.update(+id, updateExpedienteDto);
  }

  @Delete('/documento/:id')
  removeDocumento(@Param('id') id: string) {
    return this.expedienteService.removeDocumento(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expedienteService.remove(+id);
  }
}
