import axios from 'axios';
import * as cheerio from 'cheerio';
import { urlValidator } from './services';
import { API_CONFIG, ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from '@/lib/constants';
import type { MetadataResponse, ErrorResponse } from '@/lib/types';

export async function scrapeMetadata(url: string): Promise<MetadataResponse> {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': API_CONFIG.FETCH.USER_AGENT,
    },
    maxContentLength: API_CONFIG.FETCH.MAX_CONTENT_LENGTH,
    timeout: API_CONFIG.FETCH.TIMEOUT,
  });

  const html = response.data;
  const $ = cheerio.load(html);
  
  // Extract title
  const title = $('title').first().text();

  // Extract primary meta tags
  const primaryMeta = $('meta[name]').map((_, el) => ({
    name: $(el).attr('name') || '',
    content: $(el).attr('content') || '',
  })).get();

  // Extract OpenGraph tags
  const openGraph = $('meta[property^="og:"]').map((_, el) => ({
    name: $(el).attr('property') || '',
    content: $(el).attr('content') || '',
  })).get();

  // Extract Twitter Card tags
  const twitter = $('meta[name^="twitter:"]').map((_, el) => ({
    name: $(el).attr('name') || '',
    content: $(el).attr('content') || '',
  })).get();

  // Extract Schema.org JSON-LD
  const schemaOrg = $('script[type="application/ld+json"]')
    .map((_, el) => $(el).html() || '')
    .get()
    .filter(Boolean);

  // Extract favicon
  const favicon = $('link[rel="icon"], link[rel="shortcut icon"]').attr('href') || undefined;

  // Extract preview image (prefer OG image)
  const previewImage = 
    $('meta[property="og:image"]').attr('content') || 
    $('meta[name="twitter:image"]').attr('content') || 
    undefined;

  return {
    title,
    primaryMeta,
    openGraph,
    twitter,
    schemaOrg,
    favicon,
    previewImage,
  };
}

export async function handleScrapeRequest(url: string | null): Promise<{ 
  response: MetadataResponse | ErrorResponse; 
  status: number; 
}> {
  if (!url) {
    return {
      response: {
        error: 'URL parameter is required',
        code: ERROR_CODES.INVALID_URL,
      },
      status: HTTP_STATUS.BAD_REQUEST,
    };
  }

  // Validate URL
  const validationResult = urlValidator.validate(url);
  if (!validationResult.isValid) {
    return {
      response: {
        error: validationResult.error || ERROR_MESSAGES[ERROR_CODES.INVALID_URL],
        code: ERROR_CODES.INVALID_URL,
      },
      status: HTTP_STATUS.BAD_REQUEST,
    };
  }

  try {
    // Use normalized URL for the request
    const metadata = await scrapeMetadata(validationResult.normalizedUrl!);
    return {
      response: metadata,
      status: HTTP_STATUS.OK,
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {
      response: {
        error: ERROR_MESSAGES[ERROR_CODES.FETCH_ERROR],
        code: ERROR_CODES.FETCH_ERROR,
      },
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
} 