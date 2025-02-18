import { MetadataSection } from '../components/MetadataSection';
import { TagDisplay, EmptyTagDisplay } from '../components/TagDisplay';
import { UI_CONSTANTS } from '@/lib/constants';
import type { MetaTag } from '@/lib/types';

interface CardsSectionProps {
  twitter?: MetaTag[];
  schemaOrg?: string[];
}

export function CardsSection({ twitter, schemaOrg }: CardsSectionProps) {
  return (
    <div className="grid gap-6">
      {/* Twitter Cards */}
      <MetadataSection title={UI_CONSTANTS.SECTIONS.TWITTER}>
        {twitter?.length ? (
          twitter.map((tag, index) => (
            <TagDisplay key={`${tag.name}-${index}`} tag={tag} />
          ))
        ) : (
          <EmptyTagDisplay />
        )}
      </MetadataSection>

      {/* Schema.org Data */}
      <MetadataSection title={UI_CONSTANTS.SECTIONS.SCHEMA_ORG}>
        {schemaOrg?.length ? (
          <div className="space-y-4">
            {schemaOrg.map((schema, index) => (
              <pre 
                key={index} 
                className="overflow-x-auto p-2 rounded bg-background/10 text-background text-sm font-mono"
                data-element="schema-content"
              >
                {JSON.stringify(JSON.parse(schema), null, 2)}
              </pre>
            ))}
          </div>
        ) : (
          <EmptyTagDisplay />
        )}
      </MetadataSection>
    </div>
  );
} 