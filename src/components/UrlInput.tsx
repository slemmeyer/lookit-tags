'use client';

import { useState } from 'react';
import { UI_CONSTANTS } from '@/lib/constants';
import { urlValidator } from '@/services/UrlValidator';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export default function UrlInput({ onSubmit, isLoading = false }: UrlInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedInput = urlValidator.normalizeInput(url);
    setUrl(normalizedInput);
    onSubmit(normalizedInput);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={UI_CONSTANTS.PLACEHOLDER.URL_INPUT}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? UI_CONSTANTS.BUTTON_TEXT.CHECKING : UI_CONSTANTS.BUTTON_TEXT.CHECK}
        </button>
      </div>
    </form>
  );
} 