export interface ListeningPreview {
  id: number;
  title: string;
  category: string;
  thumbnailUrl: string;
}

export interface ReadingPreview {
  id: number;
  title: string;
  category: string;
  thumbnailUrl: string;
  description: string;
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
