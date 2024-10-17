import { Preview } from './Preview';

export type SearchResponse = {
  code: string;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    contents: Preview[];
  };
};
