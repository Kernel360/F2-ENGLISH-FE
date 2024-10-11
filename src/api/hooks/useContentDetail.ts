import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchContentDetail } from '../queries/contentsQueries';
import { ContentDetailResponse } from '../../types/ContentDetail';

export const useContentDetail = (
  contentId: number,
): UseQueryResult<ContentDetailResponse> => {
  return useQuery({
    queryKey: ['contentDetail', contentId],
    queryFn: () => fetchContentDetail(contentId),
  });
};
