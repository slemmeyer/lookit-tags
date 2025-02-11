import axios from 'axios';
import { ErrorResponse } from '@/lib/types';
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from '@/lib/constants';

export function createErrorResponse(
  code: keyof typeof ERROR_CODES,
  customMessage?: string,
  status = HTTP_STATUS.BAD_REQUEST
): { response: ErrorResponse; status: number } {
  return {
    response: {
      error: customMessage || ERROR_MESSAGES[ERROR_CODES[code]],
      code: ERROR_CODES[code],
    },
    status,
  };
}

export function handleApiError(error: unknown): { response: ErrorResponse; status: number } {
  console.error('API Error:', error);
  
  if (axios.isAxiosError(error)) {
    // Handle network errors (like ENOTFOUND, ECONNREFUSED)
    if (error.code === 'ENOTFOUND') {
      return createErrorResponse('FETCH_ERROR', 'Domain not found or unreachable');
    }
    if (error.code === 'ECONNABORTED') {
      return createErrorResponse('FETCH_ERROR', 'Request timed out', HTTP_STATUS.GATEWAY_TIMEOUT);
    }
    if (error.code === 'ECONNREFUSED') {
      return createErrorResponse('FETCH_ERROR', 'Connection refused by the server');
    }
    if (error.response?.status === 404) {
      return createErrorResponse('FETCH_ERROR', 'Resource not found', HTTP_STATUS.NOT_FOUND);
    }
    // Handle other axios errors
    return createErrorResponse(
      'FETCH_ERROR',
      error.message || 'Failed to fetch the URL',
      error.response?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
  
  // Handle non-axios errors
  return createErrorResponse(
    'FETCH_ERROR',
    error instanceof Error ? error.message : 'An unexpected error occurred',
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
} 