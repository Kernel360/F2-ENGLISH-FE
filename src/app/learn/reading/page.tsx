'use client';

import ArticlePreview from '@/components/ArticlePreview';
import { useReadingContents } from '@/api/hooks/usePreview';
import ContentTypeFilter from '@/components/ContentTypeFilter';

export default function ReadingPage() {
  const {
    data: readingContents,
    isLoading,
    isError,
    error,
  } = useReadingContents();

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  if (!readingContents || readingContents.data.contents.length === 0) {
    return <p>콘텐츠가 없습니다.</p>;
  }

  return (
    <div>
      <ContentTypeFilter />
      <ul className="flex flex-col gap-6 mt-8">
        {readingContents.data.contents.map((content) => (
          <ArticlePreview key={content.contentId} data={content} />
        ))}
      </ul>
    </div>
  );
}
