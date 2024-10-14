import { FetchQuizResponse } from '@/types/Quiz';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/view`;

// 스크랩 되었는지 확인
export const fetchQuiz = async (
  contentId: number,
): Promise<FetchQuizResponse> => {
  const response = await fetch(`${BASE_URL}/${contentId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch scrap');
  }
  return response.json();
};
