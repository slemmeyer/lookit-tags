'use client';

import { useState } from 'react';
import UrlInput from '@/components/UrlInput';
import MetaResults from '@/components/MetaResults';

export default function Home() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch metadata');
      
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container">
      <h1 className="heading-primary">
        Lookit the tags I&apos;ve found!
      </h1>
      <div className="content-wrapper">
        <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />
        
        {error && (
          <div 
            className="error-message"
            data-element="error-message"
          >
            {error}
          </div>
        )}
        
        <MetaResults results={results} />
      </div>
    </main>
  );
}
