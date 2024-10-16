// app/search/page.tsx

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ id: number; title: string }[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryParam = searchParams.get('q') || '';
    setQuery(queryParam);

    // Fetch 검색 결과
    async function fetchResults() {
      if (queryParam) {
        const res = await fetch(`/api/search?q=${queryParam}`);
        const data = await res.json();
        setResults(data);
      }
    }

    fetchResults();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Search Page</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="flex-grow"
            />
            <Button type="submit">검색</Button>
          </div>
        </form>
        {query && (
          <div>
            <h2 className="text-xl font-semibold mb-2">검색 결과: {query}</h2>
            {results.length > 0 ? (
              <ul className="space-y-2">
                {results.map((result) => (
                  <li key={result.id} className="p-2 bg-gray-100 rounded">
                    {result.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </Suspense>
  );
}
