import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as apm from 'elastic-apm-node';

export function setupApm(configService: ConfigService) {
  const logger = new Logger('ElasticAPM');

  const apmEnabled = configService.get<boolean>('APM_ENABLED');
  if (!apmEnabled) {
    logger.log('APM integration disabled');
    return;
  }

  try {
    apm.start({
      secretToken: configService.get<string>('APP_SECRET_TOKEN'),
      serviceName: configService.get<string>('APM_SERVICE_NAME'),
      serverUrl: configService.get<string>('APM_SERVER_URL'),
      environment: configService.get<string>('NODE_ENV'),
    });
    logger.log('APM integration started');
  } catch (error) {
    logger.log('APM integration failed', error);
  }
}
