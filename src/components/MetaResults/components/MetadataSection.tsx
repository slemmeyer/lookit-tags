import type { MetadataSectionProps } from '../types';

export function MetadataSection({ title, children }: MetadataSectionProps) {
  return (
    <div 
      className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      data-component="metadata-section"
    >
      <h2 
        className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700"
        data-element="section-title"
      >
        {title}
      </h2>
      <div data-element="section-content">
        {children}
      </div>
    </div>
  );
} 