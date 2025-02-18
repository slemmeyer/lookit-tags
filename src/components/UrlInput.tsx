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
    <form 
      onSubmit={handleSubmit} 
      className="input-form"
      data-component="url-form"
    >
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={UI_CONSTANTS.PLACEHOLDER.URL_INPUT}
        className="text-input"
        data-element="url-input"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="submit-button"
        data-element="submit-button"
      >
        {isLoading ? UI_CONSTANTS.BUTTON_TEXT.CHECKING : UI_CONSTANTS.BUTTON_TEXT.CHECK}
      </button>
    </form>
  );
} 