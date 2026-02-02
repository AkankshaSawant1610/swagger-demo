import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // GLOBAL VALIDATION
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API VERSIONING
  app.enableVersioning({
    type: VersioningType.URI, // /v1/users
    defaultVersion: '1',
  });

  // SWAGGER CONFIG
  const config = new DocumentBuilder()
    .setTitle('Swagger Demo API')
    .setDescription('NestJS Swagger learning project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // EXPORT SWAGGER JSON
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  // SETUP SWAGGER UI (ONLY IN DEV)
  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('api', app, document, {
      customSiteTitle: 'Swagger Demo - NestJS',
      swaggerOptions: { docExpansion: 'list' },
      customCss: `.swagger-ui .topbar { display: none }`,
    });
  }

  await app.listen(3001);
}
bootstrap();
