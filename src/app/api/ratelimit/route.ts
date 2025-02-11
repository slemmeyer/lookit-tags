import { NextResponse } from 'next/server';
import { rateLimiter } from '@/services/RateLimiter';
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from '@/lib/constants';

export async function GET(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'anonymous';

    const rateLimitInfo = await rateLimiter.isRateLimited(ip);
    
    if (rateLimitInfo.isLimited) {
      return NextResponse.json(
        { 
          error: ERROR_MESSAGES[ERROR_CODES.RATE_LIMITED],
          code: ERROR_CODES.RATE_LIMITED,
          resetTime: rateLimitInfo.resetTime,
        },
        { 
          status: HTTP_STATUS.TOO_MANY_REQUESTS,
          headers: {
            'X-RateLimit-Limit': String(process.env.RATE_LIMIT_MAX_REQUESTS || '30'),
            'X-RateLimit-Remaining': String(rateLimitInfo.remaining),
            'X-RateLimit-Reset': String(rateLimitInfo.resetTime),
          }
        }
      );
    }

    await rateLimiter.increment(ip);
    
    return NextResponse.json({ 
      remaining: rateLimitInfo.remaining,
      resetTime: rateLimitInfo.resetTime 
    });
  } catch (error) {
    console.error('Rate limiting error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
} 