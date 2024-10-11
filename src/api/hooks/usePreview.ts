import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  fetchListeningPreview,
  fetchReadingPreview,
} from '../queries/contentsQueries';
import {
  ListeningPreviewResponse,
  ReadingPreviewResponse,
} from '../../types/Preview';

export const useReadingPreview = (): UseQueryResult<ReadingPreviewResponse> => {
  return useQuery({
    queryKey: ['readingPreviewData'],
    queryFn: () => fetchReadingPreview(),
  });
};

export const useListeningPreview =
  (): UseQueryResult<ListeningPreviewResponse> => {
    return useQuery({
      queryKey: ['listeningPreviewData'],
      queryFn: () => fetchListeningPreview(),
    });
  };
