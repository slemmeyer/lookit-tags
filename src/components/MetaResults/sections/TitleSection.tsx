import { MetadataSection } from '../components/MetadataSection';
import { UI_CONSTANTS } from '@/lib/constants';

interface TitleSectionProps {
  title?: string;
}

export function TitleSection({ title }: TitleSectionProps) {
  return (
    <MetadataSection title={UI_CONSTANTS.SECTIONS.TITLE}>
      {title ? (
        <div 
          className="font-medium break-words text-foreground"
          data-element="title-content"
        >
          {title}
        </div>
      ) : (
        <div 
          className="text-foreground/50 italic"
          data-element="title-empty"
        >
          {UI_CONSTANTS.PLACEHOLDER.EMPTY_RESULT}
        </div>
      )}
    </MetadataSection>
  );
} 