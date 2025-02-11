import { UrlValidationOptions, UrlValidationResult, UrlValidatorService } from '@/lib/types';
import { SECURITY } from '@/lib/constants';
import { ERROR_CODES, ERROR_MESSAGES } from '@/lib/constants';

export class UrlValidator implements UrlValidatorService {
  private readonly options: Required<UrlValidationOptions>;

  constructor(options: UrlValidationOptions = {}) {
    this.options = {
      allowedProtocols: options.allowedProtocols || ['http:', 'https:'],
      blockedDomains: options.blockedDomains || SECURITY.BLOCKED_DOMAINS,
      maxUrlLength: options.maxUrlLength || 2048,
      requireProtocol: options.requireProtocol ?? true,
    };
  }

  normalizeInput(input: string): string {
    if (!input) return input;
    
    input = input.trim();
    
    if (/^https?:\/\//i.test(input)) {
      return input;
    }
    
    return `https://${input}`;
  }

  validate(urlString: string): UrlValidationResult {
    const normalizedInput = this.normalizeInput(urlString);
    
    if (!normalizedInput?.trim()) {
      return {
        isValid: false,
        error: 'URL cannot be empty',
      };
    }

    if (normalizedInput.length > this.options.maxUrlLength) {
      return {
        isValid: false,
        error: `URL exceeds maximum length of ${this.options.maxUrlLength} characters`,
      };
    }

    try {
      const url = new URL(normalizedInput);

      if (!this.options.allowedProtocols.includes(url.protocol)) {
        return {
          isValid: false,
          error: `Invalid protocol. Allowed protocols: ${this.options.allowedProtocols.join(', ')}`,
        };
      }

      if (this.isBlockedDomain(url.hostname)) {
        return {
          isValid: false,
          error: ERROR_MESSAGES[ERROR_CODES.BLOCKED_DOMAIN],
        };
      }

      return {
        isValid: true,
        normalizedUrl: this.normalizeUrl(url.toString()),
      };
    } catch {
      return {
        isValid: false,
        error: ERROR_MESSAGES[ERROR_CODES.INVALID_URL],
      };
    }
  }

  isBlockedDomain(hostname: string): boolean {
    return this.options.blockedDomains.some(blockedDomain => 
      hostname === blockedDomain || 
      hostname.endsWith(`.${blockedDomain}`)
    );
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

  private isPrivateIP(hostname: string): boolean {
    try {
      // Convert hostname to IP (if it's an IP)
      const parts = hostname.split('.');
      if (parts.length !== 4) return false;
      
      const bytes = parts.map(part => parseInt(part, 10));
      if (bytes.some(byte => isNaN(byte) || byte < 0 || byte > 255)) return false;
      
      // Check for private IP ranges
      return (
        (bytes[0] === 10) || // 10.0.0.0/8
        (bytes[0] === 172 && bytes[1] >= 16 && bytes[1] <= 31) || // 172.16.0.0/12
        (bytes[0] === 192 && bytes[1] === 168) || // 192.168.0.0/16
        (bytes[0] === 127) || // 127.0.0.0/8
        (bytes[0] === 0) || // 0.0.0.0/8
        (bytes[0] === 169 && bytes[1] === 254) // 169.254.0.0/16
      );
    } catch {
      return false;
    }
  }
} 