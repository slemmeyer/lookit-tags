import { TagDisplayProps } from '../types';

export function TagDisplay({ tag }: TagDisplayProps) {
  return (
    <div className="mb-2 last:mb-0">
      <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
        {tag.name}:
      </span>
      <span className="ml-2 text-sm break-words">
        {tag.content}
      </span>
    </div>
  );
}

export function EmptyTagDisplay() {
  return (
    <div className="text-sm text-gray-500 dark:text-gray-400 italic">
      No tags found
    </div>
  );
} 