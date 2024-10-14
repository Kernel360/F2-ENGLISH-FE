import { useQuery } from '@tanstack/react-query';
import { FetchQuizResponse } from '@/types/Quiz';
import { fetchQuiz } from '../queries/quizQueries';

export const useFetchQuiz = (contentId: number) => {
  return useQuery<FetchQuizResponse>({
    queryKey: ['quiz', contentId],
    queryFn: () => fetchQuiz(contentId),
  });
};
