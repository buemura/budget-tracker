import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { CacheService } from '@domain/cache/contracts/cache.service';
import { ISetCache } from '@domain/cache/dtos/set-cache.interface';
import { ERROR_MESSAGE } from '@domain/cache/errors/message';

@Injectable()
export class RedisCacheService implements CacheService {
  private client: Redis;

  constructor(private configService: ConfigService) {
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      throw new BadGatewayException(ERROR_MESSAGE.CACHE_UNAVAILABLE);
    }
  }

  async set(data: ISetCache): Promise<void> {
    try {
      await this.client.set(data.key, JSON.stringify(data.value));
    } catch (error) {
      throw new BadGatewayException(ERROR_MESSAGE.CACHE_UNAVAILABLE);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      throw new BadGatewayException(ERROR_MESSAGE.CACHE_UNAVAILABLE);
    }
  }
}
