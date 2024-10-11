// src/types/Bookmark.ts
export interface Bookmark {
  bookmarkId: number;
  sentenceIndex: number;
  wordIndex?: number;
  description: string | null;
}

export interface BookmarkResponse {
  code: string;
  message: string;
  data: Bookmark[];
}
