import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as apm from 'elastic-apm-node';

export function setupApm() {
  const logger = new Logger('Elastic APM');
  const configService = new ConfigService();

  try {
    apm.start({
      // secretToken: configService.get<string>('APP_SECRET_TOKEN'),
      serviceName: configService.get<string>('APM_SERVICE_NAME'),
      serverUrl: configService.get<string>('APM_SERVER_URL'),
      environment: configService.get<string>('NODE_ENV'),
    });
    logger.log('APM Integration started');
  } catch (error) {
    logger.log('APM Integration failed', error);
  }
}
