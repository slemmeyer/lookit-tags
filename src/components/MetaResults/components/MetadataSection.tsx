import type { MetadataSectionProps } from '../types';

export function MetadataSection({ title, children }: MetadataSectionProps) {
  return (
    <div 
      className="p-6 rounded-lg bg-dark-accent border border-dark-accent shadow-sm"
      data-component="metadata-section"
    >
      <h2 
        className="text-xl font-display font-bold mb-4 pb-2 border-b border-background/20 text-background"
        data-element="section-title"
      >
        {title}
      </h2>
      <div 
        className="text-foreground"
        data-element="section-content"
      >
        {children}
      </div>
    </div>
  );
} 