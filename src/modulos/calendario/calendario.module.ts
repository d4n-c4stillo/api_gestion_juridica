import { Module } from '@nestjs/common';
import { CalendarioService } from './calendario.service';
import { CalendarioController } from './calendario.controller';


import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendar } from "../../../src/entities/Calendar";
import { RespuestaGenericaService } from "../../../src/shared/respuesta.service";


@Module({
  imports:[     
    TypeOrmModule.forFeature([Calendar]),
  ],
  controllers: [CalendarioController],
  providers: [CalendarioService, RespuestaGenericaService],
})
export class CalendarioModule {}
