import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  fetchListeningContents,
  fetchListeningPreview,
  fetchReadingContents,
  fetchReadingPreview,
} from '../queries/contentsQueries';
import { ContentsResponse, PreviewResponse } from '../../types/Preview';

export const useReadingPreview = (): UseQueryResult<PreviewResponse> => {
  return useQuery({
    queryKey: ['readingPreviewData'],
    queryFn: () => fetchReadingPreview(),
  });
};

export const useListeningPreview = (): UseQueryResult<PreviewResponse> => {
  return useQuery({
    queryKey: ['listeningPreviewData'],
    queryFn: () => fetchListeningPreview(),
  });
};

export const useReadingContents = (): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: ['readingContentsData'],
    queryFn: () => fetchReadingContents(),
  });
};

export const useListeningContents = (): UseQueryResult<ContentsResponse> => {
  return useQuery({
    queryKey: ['listeningContentsData'],
    queryFn: () => fetchListeningContents(),
  });
};
