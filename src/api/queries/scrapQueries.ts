import {
  FetchScrapResponse,
  CreateScrapResponse,
  DeleteScrapResponse,
} from '@/types/Scrap';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/scrap/view`;

// 스크랩 조회
export const fetchScrap = async (): Promise<FetchScrapResponse> => {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch scrap');
  }
  return response.json();
};

// 스크랩 생성
export const createScrap = async (
  contentId: number,
): Promise<CreateScrapResponse> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ contentId }),
  });
  if (!response.ok) {
    throw new Error('Failed to create scrap');
  }
  return response.json();
};

// 스크랩 삭제
export const deleteScrap = async (
  contentId: number,
): Promise<DeleteScrapResponse> => {
  const response = await fetch(`${BASE_URL}?contentId=${contentId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to delete scrap');
  }
  return response.json();
};
