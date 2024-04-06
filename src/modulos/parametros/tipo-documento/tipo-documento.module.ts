import { Module } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { TipoDocumentoController } from './tipo-documento.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDocumento } from "../../../entities/TipoDocumento";
import { RespuestaGenericaService } from "../../../shared/respuesta.service";

@Module({
  imports:[ TypeOrmModule.forFeature([TipoDocumento]),],
  controllers: [TipoDocumentoController],
  providers: [TipoDocumentoService, RespuestaGenericaService],
  exports: [TipoDocumentoService]
})
export class TipoDocumentoModule {}
