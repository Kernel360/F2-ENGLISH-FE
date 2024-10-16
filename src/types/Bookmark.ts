export interface BookmarkByContentId {
  bookmarkId: number;
  sentenceIndex: number;
  wordIndex?: number;
  description: string | null;
}

export interface BookmarkByContentIdResponse {
  code: string;
  message: string;
  data: {
    bookmarkList: BookmarkByContentId[];
  };
}

export interface Bookmark {
  bookmarkId: number;
  bookmarkDetail: string | null;
  description: string | null;
  contentType: 'LISTENING' | 'READING';
  contentId: number;
  contentTitle: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkListResponse {
  code: string;
  message: string;
  data: {
    bookmarkMyList: Bookmark[];
  };
}
