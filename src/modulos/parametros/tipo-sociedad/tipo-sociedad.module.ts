import { Module } from '@nestjs/common';
import { TipoSociedadService } from './tipo-sociedad.service';
import { TipoSociedadController } from './tipo-sociedad.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoSociedad } from "../../../entities/TipoSociedad";
import { RespuestaGenericaService } from "../../../shared/respuesta.service";

@Module({
  imports:[ TypeOrmModule.forFeature([TipoSociedad]),],
  controllers: [TipoSociedadController],
  providers: [TipoSociedadService, RespuestaGenericaService],
})
export class TipoSociedadModule {}
