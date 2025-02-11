import type { MetaTag } from '@/lib/types';

export interface MetadataSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface TagDisplayProps {
  tag: MetaTag;
}

export interface PreviewSectionProps {
  title: string;
  imageUrl?: string | null;
  alt: string;
}

export interface MetaResultsProps {
  results: {
    title: string;
    primaryMeta: MetaTag[];
    openGraph: MetaTag[];
    twitter: MetaTag[];
    schemaOrg: string[];
    favicon?: string;
    previewImage?: string | null;
  } | null;
} 