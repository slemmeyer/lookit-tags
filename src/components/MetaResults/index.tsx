console.log('Rendering from:', 'new MetaResults');

import { MetaResultsProps } from './types';
import { TitleSection } from './sections/TitleSection';
import { MetaTagsSection } from './sections/MetaTagsSection';
import { CardsSection } from './sections/CardsSection';
import { PreviewsSection } from './sections/PreviewsSection';

export default function MetaResults({ results }: MetaResultsProps) {
  return (
    <div 
      className="w-full max-w-4xl grid gap-6"
      data-component="meta-results"
    >
      <TitleSection 
        title={results?.title} 
        data-section="title"
      />
      
      <MetaTagsSection 
        primaryMeta={results?.primaryMeta} 
        openGraph={results?.openGraph} 
        data-section="meta-tags"
      />
      
      <CardsSection 
        twitter={results?.twitter} 
        schemaOrg={results?.schemaOrg} 
        data-section="cards"
      />
      
      <PreviewsSection 
        favicon={results?.favicon}
        previewImage={results?.previewImage}
        data-section="previews"
      />
    </div>
  );
} 