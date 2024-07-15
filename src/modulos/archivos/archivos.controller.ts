import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UploadedFile, UseInterceptors, UseGuards, StreamableFile } from '@nestjs/common';

import { ArchivosService } from './archivos.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileName, fileFilter } from '../../helpers/file.utils';

import { createReadStream } from 'fs';
import { join } from 'path';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RespuestaGenericaService } from "../../shared/respuesta.service";

@ApiTags('Archivo Documental ')
@Controller('archivos')
export class ArchivosController {
  constructor(
    private readonly archivosService: ArchivosService,
    private _serviceResp: RespuestaGenericaService,
  ) { }


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

  @Get('/uploads/:name')
  getFile(@Param("name") name: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), `/uploads/${name}`))
    return new StreamableFile(file)
  }

  @Get('/files/rue/:name')
  getFileRue(@Param("name") name: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), `/uploads/${name}`))
    return new StreamableFile(file)
  }

  @Post()
  create(@Body() createArchivoDto: CreateArchivoDto) {
    return this.archivosService.create(createArchivoDto);
  }

  @Get('findAllByGrupoId/:id')
  findAllByGrupoId(@Param('id') id: string) {
    return this.archivosService.findAllByGrupoId(+id);
  }

  @Get()
  findAll() {
    return this.archivosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archivosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArchivoDto: UpdateArchivoDto) {
    return this.archivosService.update(+id, updateArchivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivosService.remove(+id);
  }
}
