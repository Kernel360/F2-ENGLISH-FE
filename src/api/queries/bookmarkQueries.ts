import {
  Bookmark,
  BookmarkListResponse,
  BookmarkByContentIdResponse,
} from '../../types/Bookmark';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark`;

export const fetchAllBookmarks = async (): Promise<BookmarkListResponse> => {
  const response = await fetch(`${BASE_URL}/view`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch all bookmarks');
  }
  return response.json();
};

export const fetchBookmarksByContentId = async (
  contentId: number,
): Promise<BookmarkByContentIdResponse> => {
  const response = await fetch(`${BASE_URL}/view/${contentId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch bookmarks by content ID');
  }
  return response.json();
};

// 북마크 생성 (POST)
export const createBookmark = async (
  contentId: number,
  bookmark: { sentenceIndex: number; wordIndex?: number; description?: string },
): Promise<Bookmark> => {
  const response = await fetch(`${BASE_URL}/create/${contentId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(bookmark),
  });
  if (!response.ok) {
    throw new Error('Failed to create bookmark');
  }
  return response.json();
};

// 북마크 메모 수정 (PUT)
export const updateBookmark = async (
  contentId: number,
  bookmarkId: number,
  description: string,
): Promise<Bookmark> => {
  const response = await fetch(`${BASE_URL}/update/${contentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ bookmarkId, description }),
  });
  if (!response.ok) {
    throw new Error('Failed to update bookmark');
  }
  return response.json();
};

// 북마크 삭제 (DELETE)
export const deleteBookmark = async (bookmarkId: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/delete/${bookmarkId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to delete bookmark');
  }
};
