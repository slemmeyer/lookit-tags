import { RateLimitConfig, RateLimiterInfo, RateLimiterResponse, RateLimiterService } from '@/lib/types';
import { RATE_LIMIT } from '@/lib/constants';

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