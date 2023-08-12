import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

import { AllExceptionsFilter } from '@infra/filters/all-exceptions.filter';
import { LoggerInterceptor } from '@infra/interceptors/logger.interceptor';
import { setupApm } from './config/apm';
import { setupSwagger } from './config/swagger';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  setupApm();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(
    new LoggerInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.setGlobalPrefix('api');

  setupSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);

  const logger = new Logger('App');
  logger.log(`Backend running...`);
  logger.log(`environment: ${process.env.NODE_ENV?.toUpperCase() ?? 'local'}`);
  logger.log(`host: ${await app.getUrl()}`);
}
bootstrap();
