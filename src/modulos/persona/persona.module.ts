import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Persona } from "../../../src/entities/Persona";
import { RespuestaGenericaService } from "../../../src/shared/respuesta.service";
import { TipoNacionalidadModule } from '../parametros/tipo-nacionalidad/tipo-nacionalidad.module';
import { TipoDocumentoModule } from '../parametros/tipo-documento/tipo-documento.module';

@Module({
  imports:[ 
    TipoNacionalidadModule,
    TipoDocumentoModule,
    TypeOrmModule.forFeature([Persona]),
  ],
  controllers: [PersonaController],
  providers: [PersonaService, RespuestaGenericaService], 
})
export class PersonaModule {}
