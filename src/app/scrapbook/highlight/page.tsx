'use client';

import MemoItem from '@/components/MemoItem';
import { useFetchAllBookmarks } from '@/api/hooks/useBookmarks';

export default function HighlighterAndMemo() {
  const {
    data: allBookmarkData,
    isLoading,
    isError,
    error,
  } = useFetchAllBookmarks();

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  if (!allBookmarkData || allBookmarkData.data.bookmarkMyList.length === 0) {
    return <p>북마크가 없습니다.</p>;
  }

  return (
    <div className="container w-full mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">형광펜과 메모</h1>
      <p className="text-sm text-muted-foreground">
        {allBookmarkData.data.bookmarkMyList.length}개의 형광펜
      </p>
      {allBookmarkData.data.bookmarkMyList.map((item) => (
        <MemoItem key={item.bookmarkId} data={item} />
      ))}
    </div>
  );
}
