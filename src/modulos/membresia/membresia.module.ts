import { Module } from '@nestjs/common';
import { MembresiaService } from './membresia.service';
import { MembresiaController } from './membresia.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaGenericaService } from "../../../src/shared/respuesta.service";
import { UsersMembresia } from "../../../src/entities/UsersMembresia";

import { UsersModule } from '../../users/users.module';
import { TipoSuscripcionModule } from '../parametros/tipo-suscripcion/tipo-suscripcion.module';
import { TipoMembresiaModule } from '../parametros/tipo-membresia/tipo-membresia.module';

@Module({
  imports:[ 
    UsersModule,
    TipoSuscripcionModule,
    TipoMembresiaModule,
    TypeOrmModule.forFeature([UsersMembresia]),
  ],
  controllers: [MembresiaController],
  providers: [MembresiaService, RespuestaGenericaService],
})
export class MembresiaModule {}
