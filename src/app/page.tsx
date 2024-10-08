import Carousel from '@/components/Carousel';
import readingList from '@/mock/readingList.json';
import listeningList from '@/mock/listeningList.json';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ReadingPreviewCard from '@/components/ReadingPreviewCard';
import ListeningPreviewCard from '@/components/ListeningPreviewCard';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="max-w-[1440px] mx-auto mt-8 mb-24 flex flex-col gap-12">
      {/* 인기 리스닝 컨텐츠 캐러셀 */}
      <Carousel
        previewDatas={readingList}
        header={
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">인기 리딩 컨텐츠</h3>
            <Link href="/learn/reading">
              <Button variant="ghost">
                <ChevronRight size={24} color="#6B6B6B" />
              </Button>
            </Link>
          </div>
        }
        itemComponent={ReadingPreviewCard}
        itemWidth={320}
        itemsPerPage={3}
      />
      {/* 인기 리딩 컨텐츠 캐러셀 */}
      <Carousel
        previewDatas={listeningList}
        header={
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">인기 리스닝 컨텐츠</h3>
            <Link href="/learn/listening">
              <Button variant="ghost">
                <ChevronRight size={24} color="#6B6B6B" />
              </Button>
            </Link>
          </div>
        }
        itemComponent={ListeningPreviewCard}
        itemWidth={320}
        itemsPerPage={3}
      />
    </div>
  );
}
