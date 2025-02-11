import { MetadataSection } from '../components/MetadataSection';
import { UI_CONSTANTS } from '@/lib/constants';

interface TitleSectionProps {
  title?: string;
}

export function TitleSection({ title }: TitleSectionProps) {
  return (
    <MetadataSection title={UI_CONSTANTS.SECTIONS.TITLE}>
      {title ? (
        <div className="font-medium break-words">{title}</div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400 italic">
          {UI_CONSTANTS.PLACEHOLDER.EMPTY_RESULT}
        </div>
      )}
    </MetadataSection>
  );
} 