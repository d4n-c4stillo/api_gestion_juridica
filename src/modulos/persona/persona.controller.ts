import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UploadedFile, UseInterceptors, UseGuards, StreamableFile} from '@nestjs/common';
import { PersonaService } from './persona.service';

import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from "../../../src/entities/Persona";


import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileName, fileFilter } from '../../helpers/file.utils';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { TipoNacionalidadService } from '../parametros/tipo-nacionalidad/tipo-nacionalidad.service';
import { TipoDocumentoService } from '../parametros/tipo-documento/tipo-documento.service';

import { RespuestaGenericaService } from "../../shared/respuesta.service";

@ApiTags('Persona')
@Controller('persona')
export class PersonaController {
  constructor(
    private readonly personaService: PersonaService,
    private  tipoNacionalidadService: TipoNacionalidadService,
    private  tipoDocumentoService: TipoDocumentoService,
    private _serviceResp: RespuestaGenericaService, 
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
      storage: diskStorage({
          destination: './uploads',
          filename:fileName
        }),
        fileFilter:fileFilter
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

  @Post()
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.create(createPersonaDto);
  }

  //para clientes
  @Get()
  findAll() {
    return this.personaService.findAll();
  }

  @Get('/abogados')
  findAllAbogados() {
    return this.personaService.findAllAbogados();
  }

  @Get('/usuarios')
  findAllUsuarios() {
    return this.personaService.findAllUsuarios();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personaService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
