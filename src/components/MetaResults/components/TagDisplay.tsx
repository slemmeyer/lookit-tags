import { TagDisplayProps } from '../types';

export function TagDisplay({ tag }: TagDisplayProps) {
  return (
    <div 
      className="mb-2 last:mb-0"
      data-component="tag-display"
    >
      <span 
        className="font-mono text-sm text-foreground"
        data-element="tag-name"
      >
        {tag.name}
      </span>
      <pre 
        className="mt-1 p-2 rounded bg-background/10 text-foreground text-sm whitespace-pre-wrap break-words"
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