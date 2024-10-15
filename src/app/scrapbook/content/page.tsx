'use client';

import { useFetchScrap } from '@/api/hooks/useScrap';
import ContentPreview from '@/components/ContentPreview';

export default function RecentContent() {
  const { data: allScrapData, isLoading, isError, error } = useFetchScrap();

  if (isLoading) {
    return <p className="mt-8">로딩 중...</p>;
  }

  if (isError) {
    return (
      <p className="mt-8 text-red-500">에러가 발생했습니다: {error.message}</p>
    );
  }

  if (!allScrapData || allScrapData.data.scrapList.length === 0) {
    return <p className="mt-8">북마크가 없습니다.</p>;
  }
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">최근 스크랩한 콘텐츠</h1>
      {allScrapData.data.scrapList.map((item) => (
        <ContentPreview key={item.scrapId} data={item} />
      ))}
    </div>
  );
}
