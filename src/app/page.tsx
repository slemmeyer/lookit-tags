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
    <main className="min-h-screen p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">Lookit the tags I&apos;ve found!</h1>
      <div className="flex flex-col items-center gap-8">
        <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />
        
        {error && (
          <div className="text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
            {error}
          </div>
        )}
        
        <MetaResults results={results} />
      </div>
    </main>
  );
}
