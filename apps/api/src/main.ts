import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { setupApm } from './config/apm';
import { setupMiddleware } from './config/middlewares';
import { setupSwagger } from './config/swagger';
import { AppModule } from './modules/app.module';

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
