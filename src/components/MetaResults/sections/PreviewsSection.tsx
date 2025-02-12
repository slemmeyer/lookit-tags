import { MetadataSection } from '../components/MetadataSection';
import { UI_CONSTANTS } from '@/lib/constants';

interface PreviewsSectionProps {
  favicon?: string;
  previewImage?: string | null;
}

export function PreviewsSection({ favicon, previewImage }: PreviewsSectionProps) {
  return (
    <div className="grid gap-6">
      {/* Favicon */}
      <MetadataSection title={UI_CONSTANTS.SECTIONS.FAVICON}>
        {favicon ? (
          <div className="flex items-center gap-3">
            <img
              src={favicon}
              alt="Site favicon"
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-sm break-all text-gray-600 dark:text-gray-400">
              {favicon}
            </span>
          </div>
        ) : (
          <div className="text-gray-500 dark:text-gray-400 italic">
            No favicon found
          </div>
        )}
      </MetadataSection>

      {/* Preview Image */}
      <MetadataSection title={UI_CONSTANTS.SECTIONS.PREVIEW}>
        {previewImage ? (
          <div className="space-y-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <img
                src={previewImage}
                alt="Preview image"
                className="object-contain w-full h-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="block text-sm break-all text-gray-600 dark:text-gray-400">
              {previewImage}
            </span>
          </div>
        ) : (
          <div className="text-gray-500 dark:text-gray-400 italic">
            No preview image found
          </div>
        )}
      </MetadataSection>
    </div>
  );
} 