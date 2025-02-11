import { RateLimitConfig, RateLimiterResponse, RateLimiterService } from './types';
import { Redis } from 'ioredis';
import { RATE_LIMIT } from '@/lib/constants';

export class RedisRateLimiter implements RateLimiterService {
  private readonly redis: Redis;
  private readonly config: RateLimitConfig;

  constructor(redisClient: Redis, config: Partial<RateLimitConfig> = {}) {
    this.redis = redisClient;
    this.config = {
      windowSize: config.windowSize || RATE_LIMIT.WINDOW_SIZE,
      maxRequests: config.maxRequests || RATE_LIMIT.MAX_REQUESTS,
    };
  }

  private getKey(key: string): string {
    return `ratelimit:${key}`;
  }

  async isRateLimited(key: string): Promise<RateLimiterResponse> {
    const redisKey = this.getKey(key);
    const count = parseInt(await this.redis.get(redisKey) || '0', 10);
    const ttl = await this.redis.ttl(redisKey);
    
    const now = Date.now();
    const resetTime = now + (ttl > 0 ? ttl * 1000 : this.config.windowSize);
    const remaining = Math.max(0, this.config.maxRequests - count);

    return {
      isLimited: count >= this.config.maxRequests,
      remaining,
      resetTime,
    };
  }

  async increment(key: string): Promise<void> {
    const redisKey = this.getKey(key);
    const multi = this.redis.multi();
    
    multi.incr(redisKey);
    multi.expire(redisKey, Math.ceil(this.config.windowSize / 1000));
    
    await multi.exec();
  }

  async reset(key: string): Promise<void> {
    await this.redis.del(this.getKey(key));
  }
} 