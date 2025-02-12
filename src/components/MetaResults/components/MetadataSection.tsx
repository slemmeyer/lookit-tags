import type { MetadataSectionProps } from '../types';

export function MetadataSection({ title, children }: MetadataSectionProps) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      {children}
    </div>
  );
} 