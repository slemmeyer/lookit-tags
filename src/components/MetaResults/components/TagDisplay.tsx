import { TagDisplayProps } from '../types';

export function TagDisplay({ tag }: TagDisplayProps) {
  return (
    <div className="mb-2 last:mb-0">
      <span className="font-mono text-sm text-foreground/70">
        {tag.name}:
      </span>
      <span className="ml-2 text-sm break-words text-foreground">
        {tag.content}
      </span>
    </div>
  );
}

export function EmptyTagDisplay() {
  return (
    <div className="text-sm text-foreground/50 italic py-2">
      waiting for input...
    </div>
  );
} 