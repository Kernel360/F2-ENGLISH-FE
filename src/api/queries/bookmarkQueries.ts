import { Bookmark, BookmarkResponse } from '../../types/Bookmark';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark`;

// 북마크 조회 (GET)
export const fetchBookmarks = async (
  contentId: number,
): Promise<BookmarkResponse> => {
  const response = await fetch(`${BASE_URL}/view/${contentId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch bookmarks');
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
