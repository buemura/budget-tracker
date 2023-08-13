import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './api/app.module';
import { setupApm } from './infra/config/apm';
import { setupMiddleware } from './infra/config/middlewares';
import { setupSwagger } from './infra/config/swagger';

async function bootstrap() {
  const configService = new ConfigService();
  setupApm(configService);

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Application');

  logger.log(`Setting up middlewares...`);
  setupMiddleware(app);
  setupSwagger(app);

  const port = configService.get<number>('PORT');
  await app.listen(port);
  logger.log(`App running at port ${port}...`);
}
bootstrap();
