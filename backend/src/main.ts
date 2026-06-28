import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/auth/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  if (process.env.SWAGGER_HABILITADO === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Sistema de Gestión de Proyectos')
      .setDescription(
        'Descripción de la API del sistema de gestión de proyectos',
      )
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/v1', app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
