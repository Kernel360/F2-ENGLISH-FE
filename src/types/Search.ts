import { Preview } from './Preview';

export type SearchResponse = {
  code: string;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totlaPages: number;
    totlaElements: number;
    contents: Preview[];
  };
};
