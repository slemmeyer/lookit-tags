export * from '@/lib/types';
export * from './UrlValidator';

import { UrlValidator } from './UrlValidator';

// Create a singleton instance with default options
export const urlValidator = new UrlValidator(); 