'use client';

import MemoItem from '@/components/MemoItem';
import { useFetchBookmarks } from '@/api/hooks/useBookmarks';
// import { Bookmark } from '@/types/Bookmark';

interface MemoItemProps {
  contentId: number;
  contentTitle: string;
  bookmarkId: number;
  bookmarkSentence: string;
  description: string | null;
  timestamp: number;
}

const memoItems: MemoItemProps[] = [
  {
    contentId: 1,
    contentTitle: 'The Future of Artificial Intelligence',
    bookmarkId: 101,
    bookmarkSentence:
      'Artificial intelligence is poised to transform industries in ways we cannot yet imagine.',
    description:
      'AI가 산업을 어떻게 변화시킬지 상상할 수 없다는 부분이 인상 깊다.',
    timestamp: 1620304873,
  },
  {
    contentId: 2,
    contentTitle: 'Exploring Space: The New Frontier',
    bookmarkId: 102,
    bookmarkSentence:
      'Space exploration has always been a symbol of human curiosity and ambition.',
    description:
      '우주 탐사가 인간의 호기심과 야망을 상징한다는 문장이 마음에 들었다.',
    timestamp: 1620354873,
  },
  {
    contentId: 3,
    contentTitle: 'The Impact of Climate Change',
    bookmarkId: 103,
    bookmarkSentence:
      'Climate change is the most significant challenge humanity faces today.',
    description:
      '기후 변화가 인류가 직면한 가장 큰 도전이라는 문장이 기억에 남는다.',
    timestamp: 1620404873,
  },
  {
    contentId: 4,
    contentTitle: 'Technological Advancements in Medicine',
    bookmarkId: 104,
    bookmarkSentence:
      'Medical technology is advancing at a pace never seen before.',
    description: '의료 기술이 전에 없던 속도로 발전하고 있다는 점이 흥미롭다.',
    timestamp: 1620454873,
  },
  {
    contentId: 5,
    contentTitle: 'Understanding Quantum Computing',
    bookmarkId: 105,
    bookmarkSentence:
      'Quantum computing promises to revolutionize the field of computation.',
    description: null,
    timestamp: 1620504873,
  },
];

export default function HighlighterAndMemo() {
  const {
    data: bookmarkDatas,
    isLoading,
    isError,
    error,
  } = useFetchBookmarks(1);

  if (isLoading) {
    return <p className="mt-8">로딩 중...</p>;
  }

  if (isError) {
    return (
      <p className="mt-8 text-red-500">에러가 발생했습니다: {error.message}</p>
    );
  }

  if (!bookmarkDatas || bookmarkDatas.data.length === 0) {
    return <p className="mt-8">북마크가 없습니다.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">형광펜과 메모</h1>
      <p className="text-sm text-muted-foreground">
        {bookmarkDatas.data.length}개의 형광펜
      </p>
      {memoItems.map((item) => (
        <MemoItem key={item.bookmarkId} data={item} />
      ))}
    </div>
  );
}
