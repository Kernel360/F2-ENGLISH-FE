import { SearchResponse } from '@/types/Search';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/contents/search`;

export const fetchSearchResults = async (
  query: string,
): Promise<SearchResponse> => {
  const url = `${BASE_URL}?searchWords=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  return response.json();
};
