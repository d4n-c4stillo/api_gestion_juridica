import { Module } from '@nestjs/common';
import { TipoSuscripcionService } from './tipo-suscripcion.service';
import { TipoSuscripcionController } from './tipo-suscripcion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoSuscripcion } from "../../../entities/TipoSuscripcion";
import { RespuestaGenericaService } from "../../../shared/respuesta.service";

@Module({
  imports:[ TypeOrmModule.forFeature([TipoSuscripcion]),],
  controllers: [TipoSuscripcionController],
  providers: [TipoSuscripcionService, RespuestaGenericaService],
  exports: [TipoSuscripcionService]
})
export class TipoSuscripcionModule {}
