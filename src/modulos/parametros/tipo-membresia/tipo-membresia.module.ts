import { Module } from '@nestjs/common';
import { TipoMembresiaService } from './tipo-membresia.service';
import { TipoMembresiaController } from './tipo-membresia.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoMembresia } from "../../../entities/TipoMembresia";
import { RespuestaGenericaService } from "../../../shared/respuesta.service";

@Module({
  imports:[ TypeOrmModule.forFeature([TipoMembresia]),],
  controllers: [TipoMembresiaController],
  providers: [TipoMembresiaService, RespuestaGenericaService],
})
export class TipoMembresiaModule {}
