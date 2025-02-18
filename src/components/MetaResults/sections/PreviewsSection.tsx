import { MetadataSection } from '../components/MetadataSection';
import { UI_CONSTANTS } from '@/lib/constants';

interface PreviewsSectionProps {
  favicon?: string;
  previewImage?: string | null;
}

export function PreviewsSection({ favicon, previewImage }: PreviewsSectionProps) {
  return (
    <div 
      className="grid gap-6"
      data-component="previews-section"
    >
      {/* Favicon */}
      <MetadataSection title={UI_CONSTANTS.SECTIONS.FAVICON}>
        {favicon ? (
          <div 
            className="flex items-center gap-3"
            data-element="favicon-container"
          >
            <img
              src={favicon}
              alt="Site favicon"
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              data-element="favicon-image"
            />
            <span 
              className="text-sm break-all text-background/70"
              data-element="favicon-url"
            >
              {favicon}
            </span>
          </div>
        ) : (
          <div 
            className="text-background/50 italic"
            data-element="favicon-empty"
          >
            No favicon found
          </div>
        )}
      </MetadataSection>

      {/* Preview Image */}
      <MetadataSection title={UI_CONSTANTS.SECTIONS.PREVIEW}>
        {previewImage ? (
          <div 
            className="space-y-3"
            data-element="preview-container"
          >
            <div 
              className="relative aspect-video w-full overflow-hidden rounded-lg border border-background/20"
              data-element="preview-image-container"
            >
              <img
                src={previewImage}
                alt="Preview image"
                className="object-contain w-full h-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                data-element="preview-image"
              />
            </div>
            <span 
              className="block text-sm break-all text-background/70"
              data-element="preview-url"
            >
              {previewImage}
            </span>
          </div>
        ) : (
          <div 
            className="text-background/50 italic"
            data-element="preview-empty"
          >
            No preview image found
          </div>
        )}
      </MetadataSection>
    </div>
  );
} 