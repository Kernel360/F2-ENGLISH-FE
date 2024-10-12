export interface ListeningPreview {
  contentId: number;
  title: string;
  category: string;
  thumbnailUrl: string;
  preScripts: string;
  hits: number;
}

export interface ReadingPreview {
  contentId: number;
  title: string;
  category: string;
  thumbnailUrl: string;
  preScripts: string;
  hits: number;
}

export type ListeningPreviewResponse = {
  code: string;
  message: string;
  data: ListeningPreview[];
};

export type ReadingPreviewResponse = {
  code: string;
  message: string;
  data: ReadingPreview[];
};
