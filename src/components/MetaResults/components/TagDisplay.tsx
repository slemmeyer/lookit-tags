import { UI_CONSTANTS } from '@/lib/constants';
import type { MetaTag } from '@/lib/types';

interface TagDisplayProps {
  tag: MetaTag;
}

export function TagDisplay({ tag }: TagDisplayProps) {
  return (
    <div 
      className="mb-3 last:mb-0"
      data-component="tag-display"
    >
      <div 
        className="text-sm text-background/70 mb-1"
        data-element="tag-name"
      >
        {tag.name}
      </div>
      <pre 
        className="bg-background/10 p-3 rounded whitespace-pre-wrap break-words text-sm text-background"
        data-element="tag-content"
      >
        {tag.content}
      </pre>
    </div>
  );
}

export function EmptyTagDisplay() {
  return (
    <div 
      className="text-background/50 italic"
      data-component="empty-tag-display"
    >
      {UI_CONSTANTS.PLACEHOLDER.EMPTY_RESULT}
    </div>
  );
} 