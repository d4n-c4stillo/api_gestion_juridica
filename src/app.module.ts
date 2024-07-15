import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TipoSuscripcionModule } from './modulos/parametros/tipo-suscripcion/tipo-suscripcion.module';
import { TipoSociedadModule } from './modulos/parametros/tipo-sociedad/tipo-sociedad.module';
import { TipoNacionalidadModule } from './modulos/parametros/tipo-nacionalidad/tipo-nacionalidad.module';
import { TipoMembresiaModule } from './modulos/parametros/tipo-membresia/tipo-membresia.module';
import { TipoDocumentoModule } from './modulos/parametros/tipo-documento/tipo-documento.module';
import { TipoAreaJuridicaModule } from './modulos/parametros/tipo-area-juridica/tipo-area-juridica.module';
import { PersonaModule } from './modulos/persona/persona.module';
import { MembresiaModule } from './modulos/membresia/membresia.module';
import { CalendarioModule } from './modulos/calendario/calendario.module';
import { ArchivosModule } from './modulos/archivos/archivos.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [__dirname + '/**/*{.ts,.js}'],
        url: 'postgresql://test_api_db3_user:E54A8eCyVcQcpdRCns2z66uSRAhYGt1y@dpg-corge4i1hbls73f5dkp0-a/test_api_db3', //configService.get('POSTGRES_URL'),
      
        /*host: 'oregon-postgres.render.com',
        port: 5432,
        password: 'E54A8eCyVcQcpdRCns2z66uSRAhYGt1y',
        username: 'test_api_db3_user',      
        database: 'test_api_db3',*/

        synchronize: false,
        dropSchema: false,
      }),
      inject: [ConfigService],
    }),
    TipoSuscripcionModule,
    TipoSociedadModule,
    TipoNacionalidadModule,
    TipoMembresiaModule,
    TipoDocumentoModule,
    TipoAreaJuridicaModule,
    PersonaModule,
    MembresiaModule,
    CalendarioModule,
    ArchivosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
