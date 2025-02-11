import { NextResponse } from 'next/server';
import { urlValidator } from '@/services/UrlValidator';
import { HTTP_STATUS } from '@/lib/constants';
import { scrapeMetadata } from '@/lib/api';
import { createErrorResponse, handleApiError } from '@/lib/utils/errors';
import type { ErrorResponse } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      const { response, status } = createErrorResponse('INVALID_URL', 'URL parameter is required');
      return NextResponse.json<ErrorResponse>(response, { status });
    }

    // Validate URL
    const validationResult = urlValidator.validate(url);
    if (!validationResult.isValid) {
      const { response, status } = createErrorResponse('INVALID_URL', validationResult.error);
      return NextResponse.json<ErrorResponse>(response, { status });
    }

    // Use the scrapeMetadata function from lib/api
    const metadata = await scrapeMetadata(validationResult.normalizedUrl!);
    return NextResponse.json(metadata);

  } catch (error) {
    const { response, status } = handleApiError(error);
    return NextResponse.json<ErrorResponse>(response, { status });
  }
} 