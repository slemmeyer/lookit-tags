export * from '@/lib/types';
export * from './MemoryRateLimiter';
export * from './RedisRateLimiter';

import { MemoryRateLimiter } from './MemoryRateLimiter';
import { RedisRateLimiter } from './RedisRateLimiter';
import { RateLimiterService } from '@/lib/types';
import { createRedisClient, getRedisStatus } from '@/lib/redis';

// Factory function to create the appropriate rate limiter
export function createRateLimiter(): RateLimiterService {
  const useRedis = process.env.REDIS_ENABLED === 'true';

  if (useRedis) {
    try {
      const redis = createRedisClient();
      if (redis && getRedisStatus()) {
        return new RedisRateLimiter(redis);
      }
      console.warn('Redis not connected, falling back to memory rate limiter');
      return new MemoryRateLimiter();
    } catch (error) {
      console.warn('Failed to initialize Redis rate limiter:', error);
      console.warn('Falling back to memory rate limiter');
      return new MemoryRateLimiter();
    }
  }

  return new MemoryRateLimiter();
}

// Create a singleton instance
export const rateLimiter = createRateLimiter(); 