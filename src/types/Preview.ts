export interface Preview {
  contentId: number;
  title: string;
  category: string;
  thumbnailUrl: string;
  preScripts: string;
  hits: number;
}

export interface PreviewResponse {
  code: string;
  message: string;
  data: Preview[];
}

export type ContentsResponse = {
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
