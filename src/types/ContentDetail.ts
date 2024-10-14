// src/types/ContentDetail.ts
export type Script = {
  startTimeInSecond: number;
  durationInSecond: number;
  enScript: string;
  koScript: string;
};

export type ContentDetail = {
  contentId: number;
  contentType: string;
  category: string;
  title: string;
  thumbnailUrl: string;
  videoUrl?: string;
  hits: number;
  scriptList: Script[];
};

export type ContentDetailResponse = {
  code: string;
  message: string;
  data: ContentDetail;
};
