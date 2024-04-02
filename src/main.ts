import { useContainer } from 'class-validator';
import { resolve } from 'path';

import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AuthModule } from './auth/auth.module';
import { AppModule } from './app.module';

import { TipoSuscripcionModule  } from './modulos/parametros/tipo-suscripcion/tipo-suscripcion.module';
import { TipoSociedadModule } from './modulos/parametros/tipo-sociedad/tipo-sociedad.module';
import { TipoNacionalidadModule } from './modulos/parametros/tipo-nacionalidad/tipo-nacionalidad.module';
import { TipoMembresiaModule } from './modulos/parametros/tipo-membresia/tipo-membresia.module';
import { TipoDocumentoModule } from './modulos/parametros/tipo-documento/tipo-documento.module';
import { TipoAreaJuridicaModule } from './modulos/parametros/tipo-area-juridica/tipo-area-juridica.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve('./public'));
  app.setBaseViewsDir(resolve('./views'));
  app.setViewEngine('hbs');

  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'auth/email/confirm-email', method: RequestMethod.GET },
      {
        path: 'auth/restore-password',
        method: RequestMethod.GET,
      },
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('API REST - Sistema Gestion Juridica')
    .setDescription('Documentation for endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AuthModule,
      TipoSuscripcionModule, 
      TipoSociedadModule,
      TipoNacionalidadModule,
      TipoMembresiaModule,
      TipoDocumentoModule,
      TipoAreaJuridicaModule
    ],
  });
  SwaggerModule.setup('api/docs', app, document);

  // enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // enable DI for class-validator
  useContainer(app.select(AuthModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
