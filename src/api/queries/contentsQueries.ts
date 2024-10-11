import { ContentDetailResponse } from '../../types/ContentDetail';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchContentDetail = async (
  contentId: number,
): Promise<ContentDetailResponse> => {
  const response = await fetch(`${BASE_URL}/contents/details/${contentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
