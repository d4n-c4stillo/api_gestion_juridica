import { Module } from '@nestjs/common';
import { ExpedienteService } from './expediente.service';
import { ExpedienteController } from './expediente.controller';

import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Expediente } from "../../../src/entities/Expediente";
import { ExpedienteDocumento } from "../../../src/entities/ExpedienteDocumento";
import { ExpedientePersona } from "../../../src/entities/ExpedientePersona";
import { ExpedienteSeguimiento } from "../../../src/entities/ExpedienteSeguimiento";

import { RespuestaGenericaService } from "../../../src/shared/respuesta.service";


@Module({
  imports:[     
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          // For relay SMTP server set the host to smtp-relay.gmail.com
          // and for Gmail STMO server set it to smtp.gmail.com
          host: configService.get('MAIL_HOST'),
          // For SSL and TLS connection
          secure: true,
          port: 465,
          auth: {
            // Account gmail address
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD')
          },
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Expediente]),   
    TypeOrmModule.forFeature([ExpedienteDocumento]),   
    TypeOrmModule.forFeature([ExpedientePersona]),   
    TypeOrmModule.forFeature([ExpedienteSeguimiento]),   
  ],
  controllers: [ExpedienteController],
  providers: [ExpedienteService, RespuestaGenericaService],
})
export class ExpedienteModule {}
