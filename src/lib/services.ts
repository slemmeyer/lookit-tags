import { Redis } from 'ioredis';
import { 
  RateLimitConfig, 
  RateLimiterInfo,
  RateLimiterResponse, 
  RateLimiterService,
  UrlValidationResult,
  UrlValidatorService 
} from './types';
import { RATE_LIMIT, SECURITY } from './constants';

// URL Validator Service
export class UrlValidator implements UrlValidatorService {
  validate(urlString: string): UrlValidationResult {
    try {
      new URL(urlString);
      
      // Check for blocked domains
      if (SECURITY.BLOCKED_DOMAINS.some(domain => urlString.includes(domain))) {
        return {
          isValid: false,
          error: 'Domain not allowed',
        };
      }

      return {
        isValid: true,
        normalizedUrl: this.normalizeUrl(urlString),
      };
    } catch {
      return {
        isValid: false,
        error: 'Invalid URL format',
      };
    }
  }

  normalizeUrl(urlString: string): string {
    try {
      const url = new URL(urlString);
      
      // Remove trailing slashes
      let pathname = url.pathname;
      while (pathname.endsWith('/') && pathname !== '/') {
        pathname = pathname.slice(0, -1);
      }
      
      // Remove default ports
      if (
        (url.protocol === 'http:' && url.port === '80') ||
        (url.protocol === 'https:' && url.port === '443')
      ) {
        url.port = '';
      }
      
      // Sort query parameters
      const searchParams = new URLSearchParams([...url.searchParams].sort());
      
      // Reconstruct URL
      return `${url.protocol}//${url.hostname}${url.port ? ':' + url.port : ''}${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}${url.hash}`;
    } catch {
      return urlString;
    }
  }
}

// Memory Rate Limiter Service
export class MemoryRateLimiter implements RateLimiterService {
  private requests: Map<string, RateLimiterInfo>;
  private readonly config: RateLimitConfig;

  constructor(config: Partial<RateLimitConfig> = {}) {
    this.requests = new Map();
    this.config = {
      windowSize: config.windowSize || RATE_LIMIT.WINDOW_SIZE,
      maxRequests: config.maxRequests || RATE_LIMIT.MAX_REQUESTS,
    };
  }

  private cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.config.windowSize;

    for (const [key, data] of this.requests.entries()) {
      if (data.timestamp < windowStart) {
        this.requests.delete(key);
      }
    }
  }

  async isRateLimited(key: string): Promise<RateLimiterResponse> {
    this.cleanup();
    
    const now = Date.now();
    const windowStart = now - this.config.windowSize;
    const requestData = this.requests.get(key) || { count: 0, timestamp: now };
    
    if (requestData.timestamp < windowStart) {
      return {
        isLimited: false,
        remaining: this.config.maxRequests,
        resetTime: now + this.config.windowSize,
      };
    }

    const remaining = Math.max(0, this.config.maxRequests - requestData.count);
    const resetTime = requestData.timestamp + this.config.windowSize;

    return {
      isLimited: requestData.count >= this.config.maxRequests,
      remaining,
      resetTime,
    };
  }

  async increment(key: string): Promise<void> {
    const now = Date.now();
    const windowStart = now - this.config.windowSize;
    const requestData = this.requests.get(key) || { count: 0, timestamp: now };

    if (requestData.timestamp < windowStart) {
      requestData.count = 1;
      requestData.timestamp = now;
    } else {
      requestData.count++;
    }

    this.requests.set(key, requestData);
  }

  async reset(key: string): Promise<void> {
    this.requests.delete(key);
  }
}

// Redis Rate Limiter Service
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

// Service instances
export const urlValidator = new UrlValidator();
export const memoryRateLimiter = new MemoryRateLimiter(); 