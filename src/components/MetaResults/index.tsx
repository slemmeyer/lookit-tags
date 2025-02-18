import { MetaResultsProps } from './types';
import { TitleSection } from './sections/TitleSection';
import { MetaTagsSection } from './sections/MetaTagsSection';
import { CardsSection } from './sections/CardsSection';
import { PreviewsSection } from './sections/PreviewsSection';
import { MetadataSection } from './components/MetadataSection';
import { TagDisplay, EmptyTagDisplay } from './components/TagDisplay';

export default function MetaResults({ results }: MetaResultsProps) {
  const formatJsonLd = (script: string) => {
    try {
      return JSON.stringify(JSON.parse(script), null, 2);
    } catch {
      return script;
    }
  };

  return (
    <div 
      className="w-full max-w-4xl grid gap-6"
      data-component="meta-results"
    >
      {/* Title Section */}
      <MetadataSection title="Page Title">
        {results?.title ? (
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words text-gray-900 dark:text-gray-100">
            {results.title}
          </pre>
        ) : (
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words min-h-[2.5rem] text-gray-900 dark:text-gray-100" />
        )}
      </MetadataSection>

      {/* Meta Tags and Open Graph */}
      <div className="grid md:grid-cols-2 gap-6">
        <MetadataSection title="Primary Meta Tags">
          {results?.primaryMeta?.length ? (
            results.primaryMeta.map((tag, index) => (
              <TagDisplay key={index} tag={tag} />
            ))
          ) : (
            <>
              <EmptyTagDisplay />
              <EmptyTagDisplay />
            </>
          )}
        </MetadataSection>

        <MetadataSection title="Open Graph">
          {results?.openGraph?.length ? (
            results.openGraph.map((tag, index) => (
              <TagDisplay key={index} tag={tag} />
            ))
          ) : (
            <>
              <EmptyTagDisplay />
              <EmptyTagDisplay />
            </>
          )}
        </MetadataSection>
      </div>

      {/* Twitter and Schema.org */}
      <div className="grid md:grid-cols-2 gap-6">
        <MetadataSection title="Twitter Cards">
          {results?.twitter?.length ? (
            results.twitter.map((tag, index) => (
              <TagDisplay key={index} tag={tag} />
            ))
          ) : (
            <>
              <EmptyTagDisplay />
              <EmptyTagDisplay />
            </>
          )}
        </MetadataSection>

        <MetadataSection title="Schema.org (JSON-LD)">
          {results?.schemaOrg?.length ? (
            results.schemaOrg.map((script, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words text-sm text-gray-900 dark:text-gray-100">
                  {formatJsonLd(script)}
                </pre>
              </div>
            ))
          ) : (
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words text-sm min-h-[2.5rem] text-gray-900 dark:text-gray-100" />
          )}
        </MetadataSection>
      </div>

      {/* Preview Images */}
      <div className="grid md:grid-cols-2 gap-6">
        <MetadataSection title="Favicon">
          {results?.favicon ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={results.favicon} 
                  alt="Site Favicon"
                  className="w-6 h-6"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded flex-1 text-sm whitespace-pre-wrap break-all text-gray-900 dark:text-gray-100">
                {results.favicon}
              </pre>
            </div>
          ) : (
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words text-sm min-h-[2.5rem] text-gray-900 dark:text-gray-100" />
          )}
        </MetadataSection>

        <MetadataSection title="Preview Image">
          {results?.previewImage ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={results.previewImage} 
                  alt="Site Preview"
                  className="max-w-[200px] max-h-[200px] object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded flex-1 text-sm whitespace-pre-wrap break-all text-gray-900 dark:text-gray-100">
                {results.previewImage}
              </pre>
            </div>
          ) : (
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words text-sm min-h-[2.5rem] text-gray-900 dark:text-gray-100" />
          )}
        </MetadataSection>
      </div>
    </div>
  );
} 