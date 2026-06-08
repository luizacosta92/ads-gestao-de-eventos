// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS para o frontend Next.js
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Validação global dos DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Prefix global
  app.setGlobalPrefix('api');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Gestão de Casamentos')
    .setDescription('API do sistema Jani do Vale Cerimonial')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
  console.log(`🎊 Backend rodando em http://localhost:${process.env.PORT ?? 3001}`);
  console.log(`📖 Swagger em http://localhost:${process.env.PORT ?? 3001}/api/docs`);
}
bootstrap();
