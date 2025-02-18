import { MetadataSection } from '../components/MetadataSection';
import { UI_CONSTANTS } from '@/lib/constants';

interface PreviewsSectionProps {
  favicon?: string;
  previewImage?: string | null;
}

export function PreviewsSection({ favicon, previewImage }: PreviewsSectionProps) {
  const PreviewDisplay = ({ url, alt, isIcon = false }: { url: string, alt: string, isIcon?: boolean }) => (
    <div className="grid-layout-2-cols">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img 
            src={url} 
            alt={alt}
            className={isIcon ? 'w-6 h-6' : 'max-w-[200px] max-h-[200px] object-contain'}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <pre className="preview-code">
          {url}
        </pre>
      </div>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <MetadataSection title={UI_CONSTANTS.SECTIONS.FAVICON}>
        {favicon ? (
          <PreviewDisplay url={favicon} alt="Site Favicon" isIcon={true} />
        ) : (
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words text-sm min-h-[2.5rem] text-gray-900 dark:text-gray-100" />
        )}
      </MetadataSection>

      <MetadataSection title={UI_CONSTANTS.SECTIONS.PREVIEW}>
        {previewImage ? (
          <PreviewDisplay url={previewImage} alt="Site Preview" />
        ) : (
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap break-words text-sm min-h-[2.5rem] text-gray-900 dark:text-gray-100" />
        )}
      </MetadataSection>
    </div>
  );
} 