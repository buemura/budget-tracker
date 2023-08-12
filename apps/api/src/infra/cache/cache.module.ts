import { Module } from '@nestjs/common';

import { CacheService } from '@domain/cache/contracts/cache.service';
import { RedisCacheService } from './redis/redis-cache.service';

@Module({
  providers: [
    {
      provide: CacheService,
      useClass: RedisCacheService,
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
