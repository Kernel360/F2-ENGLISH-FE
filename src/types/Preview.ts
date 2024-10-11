export interface ListeningPreview {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

export interface ReadingPreview {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
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
