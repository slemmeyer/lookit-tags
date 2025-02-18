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
        className="muted-text mb-1"
        data-element="tag-name"
      >
        {tag.name}
      </div>
      <pre 
        className="code-block"
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
      className="italic-muted"
      data-component="empty-tag-display"
    >
      {UI_CONSTANTS.PLACEHOLDER.EMPTY_RESULT}
    </div>
  );
} 