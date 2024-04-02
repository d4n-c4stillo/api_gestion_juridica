import { Module } from '@nestjs/common';
import { TipoAreaJuridicaService } from './tipo-area-juridica.service';
import { TipoAreaJuridicaController } from './tipo-area-juridica.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoAreaJuridica } from "../../../entities/TipoAreaJuridica";
import { RespuestaGenericaService } from "../../../shared/respuesta.service";

@Module({
  imports:[ TypeOrmModule.forFeature([TipoAreaJuridica]),],
  controllers: [TipoAreaJuridicaController],
  providers: [TipoAreaJuridicaService, RespuestaGenericaService],
})
export class TipoAreaJuridicaModule {}
