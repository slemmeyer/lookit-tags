console.log('Rendering from:', 'old MetaResults');

interface MetaTag {
  name: string;
  content: string;
}

interface MetaResults {
  title: string;
  primaryMeta: MetaTag[];
  openGraph: MetaTag[];
  twitter: MetaTag[];
  schemaOrg: string[]; // JSON-LD scripts as strings
  favicon?: string;
  previewImage?: string | null;
}

interface MetaResultsProps {
  results: MetaResults | null;
}

export default function MetaResults({ results }: MetaResultsProps) {
  const MetadataSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="p-6 rounded-lg bg-dark-accent text-background border border-dark-accent shadow-sm">
      <h2 className="text-xl font-display font-bold mb-4 pb-2 border-b border-background/20 text-background">
        {title}
      </h2>
      <div>
        {children}
      </div>
    </div>
  );

  const TagDisplay = ({ tag }: { tag: MetaTag }) => (
    <div className="mb-3 last:mb-0">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{tag.name}</div>
      <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words text-sm text-gray-900 dark:text-gray-100">
        {tag.content}
      </pre>
    </div>
  );

  const EmptyTagDisplay = () => (
    <div className="mb-3 last:mb-0">
      <div className="text-sm text-gray-400 dark:text-gray-500 mb-1">waiting for input...</div>
      <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words text-sm h-[2.5rem] text-gray-900 dark:text-gray-100" />
    </div>
  );

  const PreviewSection = ({ title, imageUrl, alt }: { title: string; imageUrl?: string | null; alt: string }) => (
    <MetadataSection title={title}>
      {imageUrl ? (
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={imageUrl} 
              alt={alt}
              className={`${title === 'Favicon' ? 'w-6 h-6' : 'max-w-[200px] max-h-[200px] object-contain'}`}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded flex-1 text-sm whitespace-pre-wrap break-all text-gray-900 dark:text-gray-100">
            {imageUrl}
          </pre>
        </div>
      ) : (
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words text-sm min-h-[2.5rem] text-gray-900 dark:text-gray-100" />
      )}
    </MetadataSection>
  );

  return (
    <div className="w-full max-w-4xl grid gap-6">
      {/* Title Section */}
      <MetadataSection title="Page Title">
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words min-h-[2.5rem] text-gray-900 dark:text-gray-100">
          {results?.title || ''}
        </pre>
      </MetadataSection>

      {/* Primary Meta Tags and Open Graph */}
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
                  {script}
                </pre>
              </div>
            ))
          ) : (
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words text-sm min-h-[2.5rem] text-gray-900 dark:text-gray-100" />
          )}
        </MetadataSection>
      </div>

      {/* Favicon and Preview Image */}
      <div className="grid md:grid-cols-2 gap-6">
        <PreviewSection 
          title="Favicon" 
          imageUrl={results?.favicon} 
          alt="Site Favicon"
        />
        <PreviewSection 
          title="Preview Image" 
          imageUrl={results?.previewImage} 
          alt="Site Preview"
        />
      </div>
    </div>
  );
} 