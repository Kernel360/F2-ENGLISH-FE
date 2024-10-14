'use client';

import ListeningPreviewCard from '@/components/ListeningPreviewCard';
import { useListeningContents } from '@/api/hooks/usePreview';
import ContentTypeFilter from '@/components/ContentTypeFilter';

function ListeningPage() {
  const {
    data: listeningContents,
    isLoading,
    isError,
    error,
  } = useListeningContents();

  if (isLoading) {
    return <p className="">로딩 중...</p>;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  if (!listeningContents || listeningContents.data.contents.length === 0) {
    return <p className="">콘텐츠가 없습니다.</p>;
  }

  return (
    <main className="">
      <ContentTypeFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-8">
        {listeningContents.data.contents.map((content) => (
          <ListeningPreviewCard key={content.contentId} data={content} />
        ))}
      </div>
    </main>
  );
}

export default ListeningPage;
