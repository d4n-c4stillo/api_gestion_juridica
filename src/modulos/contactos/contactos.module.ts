import { Module } from '@nestjs/common';
import { ContactosService } from './contactos.service';
import { ContactosController } from './contactos.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Contacto } from "../../../src/entities/Contacto";
import { RespuestaGenericaService } from "../../../src/shared/respuesta.service";


@Module({
  imports:[     
    TypeOrmModule.forFeature([Contacto]),
  ],
  controllers: [ContactosController],
  providers: [ContactosService, RespuestaGenericaService],
})
export class ContactosModule {}
