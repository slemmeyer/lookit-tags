import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from '@/lib/constants';

export async function middleware(request: NextRequest) {
  // Only apply to /api/scrape endpoint
  if (!request.nextUrl.pathname.startsWith('/api/scrape')) {
    return NextResponse.next();
  }

  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'anonymous';

    // Check rate limit via API route
    const rateLimit = await fetch(`${request.nextUrl.origin}/api/ratelimit`, {
      headers: {
        'x-forwarded-for': ip,
        'x-real-ip': ip,
      },
    });

    if (!rateLimit.ok) {
      const data = await rateLimit.json();
      return NextResponse.json(
        { 
          error: data.error || ERROR_MESSAGES[ERROR_CODES.RATE_LIMITED],
          code: ERROR_CODES.RATE_LIMITED,
          resetTime: data.resetTime,
        },
        { 
          status: HTTP_STATUS.TOO_MANY_REQUESTS,
          headers: rateLimit.headers
        }
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // On errors, allow the request but log the error
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/api/:path*',
}; 