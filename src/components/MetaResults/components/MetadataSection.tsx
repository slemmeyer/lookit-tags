import type { MetadataSectionProps } from '../types';

export function MetadataSection({ title, children }: MetadataSectionProps) {
  return (
    <div className="metadata-card">
      <h2 className="heading-section">
        {title}
      </h2>
      <div className="text-foreground">
        {children}
      </div>
    </div>
  );
} 