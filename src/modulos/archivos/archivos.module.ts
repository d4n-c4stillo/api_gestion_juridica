import { Module } from '@nestjs/common';
import { ArchivosService } from './archivos.service';
import { ArchivosController } from './archivos.controller';


import { TypeOrmModule } from '@nestjs/typeorm';

import { Archivo } from "../../../src/entities/Archivo";
import { RespuestaGenericaService } from "../../../src/shared/respuesta.service";

@Module({
  imports:[     
    TypeOrmModule.forFeature([Archivo]),
  ],
  controllers: [ArchivosController],
  providers: [ArchivosService, RespuestaGenericaService],
})
export class ArchivosModule {}
