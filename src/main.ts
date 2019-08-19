import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ConfigService } from './config/config.service';
import { AppModule } from './app.module';
import { initSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const config: ConfigService = app.get('ConfigService');
  const serverPort: number = config.port;
  const serverApiPrefix: string = config.apiPrefix;

  app.setGlobalPrefix(serverApiPrefix);

  initSwagger(app, serverApiPrefix);

  await app.listen(serverPort);
}
bootstrap();
