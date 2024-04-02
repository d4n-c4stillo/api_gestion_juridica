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
        url: configService.get('POSTGRES_URL'),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
