import { MetaResultsProps } from './types';
import { TitleSection } from './sections/TitleSection';
import { MetaTagsSection } from './sections/MetaTagsSection';
import { CardsSection } from './sections/CardsSection';
import { PreviewsSection } from './sections/PreviewsSection';

export default function MetaResults({ results }: MetaResultsProps) {
  return (
    <div className="w-full max-w-4xl grid gap-6">
      <TitleSection title={results?.title} />
      
      <MetaTagsSection 
        primaryMeta={results?.primaryMeta} 
        openGraph={results?.openGraph} 
      />
      
      <CardsSection 
        twitter={results?.twitter} 
        schemaOrg={results?.schemaOrg} 
      />
      
      <PreviewsSection 
        favicon={results?.favicon}
        previewImage={results?.previewImage}
      />
    </div>
  );
} 