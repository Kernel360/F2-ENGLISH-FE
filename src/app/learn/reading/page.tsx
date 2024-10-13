'use client';

import ArticlePreview from '@/components/ArticlePreview';
import { useReadingContents } from '@/api/hooks/usePreview';

export default function ReadingPage() {
  const {
    data: readingContents,
    isLoading,
    isError,
    error,
  } = useReadingContents();

  if (isLoading) {
    return <p className="mt-8">로딩 중...</p>;
  }

  if (isError) {
    return (
      <p className="mt-8 text-red-500">에러가 발생했습니다: {error.message}</p>
    );
  }

  if (!readingContents || readingContents.data.contents.length === 0) {
    return <p className="mt-8">콘텐츠가 없습니다.</p>;
  }

  return (
    <div className="mt-8">
      <ul className="flex flex-col gap-4">
        {readingContents.data.contents.map((content) => (
          <ArticlePreview key={content.contentId} data={content} />
        ))}
      </ul>
    </div>
  );
}
