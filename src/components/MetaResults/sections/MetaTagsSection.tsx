import { MetadataSection } from '../components/MetadataSection';
import { TagDisplay, EmptyTagDisplay } from '../components/TagDisplay';
import { UI_CONSTANTS } from '@/lib/constants';
import type { MetaTag } from '@/lib/types';

interface MetaTagsSectionProps {
  primaryMeta?: MetaTag[];
  openGraph?: MetaTag[];
}

export function MetaTagsSection({ primaryMeta, openGraph }: MetaTagsSectionProps) {
  return (
    <div className="grid gap-6">
      {/* Primary Meta Tags */}
      <MetadataSection title={UI_CONSTANTS.SECTIONS.PRIMARY_META}>
        {primaryMeta?.length ? (
          primaryMeta.map((tag, index) => (
            <TagDisplay key={`${tag.name}-${index}`} tag={tag} />
          ))
        ) : (
          <EmptyTagDisplay />
        )}
      </MetadataSection>

      {/* Open Graph Tags */}
      <MetadataSection title={UI_CONSTANTS.SECTIONS.OPEN_GRAPH}>
        {openGraph?.length ? (
          openGraph.map((tag, index) => (
            <TagDisplay key={`${tag.name}-${index}`} tag={tag} />
          ))
        ) : (
          <EmptyTagDisplay />
        )}
      </MetadataSection>
    </div>
  );
} 