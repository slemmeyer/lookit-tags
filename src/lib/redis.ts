import Redis from 'ioredis';
import { REDIS_CONFIG } from './constants';

let redis: Redis | null = null;
let isConnected = false;

export function createRedisClient(): Redis | null {
  // Early return if Redis is not enabled
  if (process.env.REDIS_ENABLED !== 'true') {
    return null;
  }

  if (!redis) {
    try {
      redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        // Optional: password if your Redis requires authentication
        password: process.env.REDIS_PASSWORD,
        // Recommended settings for better error handling
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
          if (times > 3) {
            return null; // stop retrying
          }
          return Math.min(times * 50, 2000); // exponential backoff
        },
        enableOfflineQueue: false,
      });

      // Error handling
      redis.on('error', (error) => {
        console.error('Redis connection error:', error);
        isConnected = false;
      });

      redis.on('connect', () => {
        console.log('Successfully connected to Redis');
        isConnected = true;
      });

      redis.on('close', () => {
        console.log('Redis connection closed');
        isConnected = false;
      });
    } catch (error) {
      console.error('Failed to create Redis client:', error);
      return null;
    }
  }

  return isConnected ? redis : null;
}

export function getRedisStatus(): boolean {
  // If Redis is not enabled, always return false
  if (process.env.REDIS_ENABLED !== 'true') {
    return false;
  }
  return isConnected;
}

// Graceful shutdown helper
export async function closeRedisConnection(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
    isConnected = false;
  }
} 