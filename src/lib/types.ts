// API Types
export interface MetaTag {
  name: string;
  content: string;
}

export interface MetadataResponse {
  title?: string;
  primaryMeta?: MetaTag[];
  openGraph?: MetaTag[];
  twitter?: MetaTag[];
  schemaOrg?: string[];
  favicon?: string;
  previewImage?: string | null;
}

export interface ErrorResponse {
  error: string;
  code?: string;
  statusCode?: number;
}

// Component Props Types
export interface MetaResultsProps {
  results: MetadataResponse | null;
}

export interface MetadataSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

// Rate Limiting Types
export interface RateLimitConfig {
  windowSize: number;
  maxRequests: number;
}

export interface RateLimiterResponse {
  isLimited: boolean;
  remaining: number;
  resetTime: number;
}

export interface RateLimiterInfo {
  count: number;
  timestamp: number;
}

export interface RateLimiterService {
  isRateLimited(key: string): Promise<RateLimiterResponse>;
  increment(key: string): Promise<void>;
  reset(key: string): Promise<void>;
}

// URL Validation Types
export interface UrlValidationOptions {
  allowedProtocols?: string[];
  blockedDomains?: string[];
  maxUrlLength?: number;
  requireProtocol?: boolean;
}

export interface UrlValidationResult {
  isValid: boolean;
  error?: string;
  normalizedUrl?: string;
}

export interface UrlValidatorService {
  validate(url: string): UrlValidationResult;
  normalizeUrl(url: string): string;
}

// Component Props Types
export interface PreviewSectionProps {
  title: string;
  imageUrl?: string | null;
  alt: string;
}

export interface MetaTagsSectionProps {
  primaryMeta?: MetaTag[];
  openGraph?: MetaTag[];
}

export interface CardsSectionProps {
  twitter?: MetaTag[];
  schemaOrg?: string[];
}

export interface TitleSectionProps {
  title?: string;
} 