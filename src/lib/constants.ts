// API and Network Configuration
export const API_CONFIG = {
  ENDPOINTS: {
    SCRAPE: '/api/scrape',
  },
  FETCH: {
    USER_AGENT: 'MetaTagChecker/1.0',
    MAX_CONTENT_LENGTH: parseInt(process.env.API_MAX_CONTENT_LENGTH || '5242880', 10),
    TIMEOUT: parseInt(process.env.API_TIMEOUT || '10000', 10),
  },
} as const;

// HTTP Status Codes and Error Handling
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_CODES = {
  INVALID_URL: 'INVALID_URL',
  RATE_LIMITED: 'RATE_LIMITED',
  FETCH_ERROR: 'FETCH_ERROR',
  PARSE_ERROR: 'PARSE_ERROR',
} as const;

export const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_URL]: 'Invalid URL provided',
  [ERROR_CODES.RATE_LIMITED]: 'Too many requests',
  [ERROR_CODES.FETCH_ERROR]: 'Failed to fetch metadata',
  [ERROR_CODES.PARSE_ERROR]: 'Failed to parse metadata',
} as const;

// UI Constants
export const UI_CONSTANTS = {
  PLACEHOLDER: {
    URL_INPUT: 'Enter website URL (e.g., https://example.com)',
    EMPTY_RESULT: 'waiting for input...',
  },
  BUTTON_TEXT: {
    CHECK: 'Check Meta Tags',
    CHECKING: 'Checking...',
  },
  SECTIONS: {
    TITLE: 'Page Title',
    PRIMARY_META: 'Primary Meta Tags',
    OPEN_GRAPH: 'Open Graph',
    TWITTER: 'Twitter Cards',
    SCHEMA_ORG: 'Schema.org (JSON-LD)',
    FAVICON: 'Favicon',
    PREVIEW: 'Preview Image',
  },
} as const;

export const RATE_LIMIT = {
  WINDOW_SIZE: parseInt(process.env.RATE_LIMIT_WINDOW_SIZE || '60000', 10),
  MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '30', 10),
} as const;

export const SECURITY = {
  BLOCKED_DOMAINS: [
    'example-malicious-site.com',
  ],
  ALLOWED_ORIGINS: process.env.NODE_ENV === 'development' 
    ? ['http://localhost:3000']
    : [process.env.NEXT_PUBLIC_FRONTEND_URL].filter(Boolean),
} as const;

export const REDIS_CONFIG = {
  KEY_PREFIX: 'ratelimit:',
  HOST: process.env.REDIS_HOST || 'localhost',
  PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
  PASSWORD: process.env.REDIS_PASSWORD,
} as const; 