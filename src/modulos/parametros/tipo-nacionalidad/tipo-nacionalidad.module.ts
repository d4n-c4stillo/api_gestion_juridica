import { Module } from '@nestjs/common';
import { TipoNacionalidadService } from './tipo-nacionalidad.service';
import { TipoNacionalidadController } from './tipo-nacionalidad.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoNacionalidad  } from "../../../entities/TipoNacionalidad";
import { RespuestaGenericaService } from "../../../shared/respuesta.service";


@Module({
  imports:[ TypeOrmModule.forFeature([TipoNacionalidad]),],
  controllers: [TipoNacionalidadController],
  providers: [TipoNacionalidadService, RespuestaGenericaService ],
  exports: [TipoNacionalidadService]
})
export class TipoNacionalidadModule {}
