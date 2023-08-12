import { ISetCache } from '../dtos/set-cache.interface';

export abstract class CacheService {
  abstract get<T>(key: string): Promise<T | null>;
  abstract set(data: ISetCache): Promise<void>;
  abstract remove(key: string): Promise<void>;
}
