import Carousel from '@/components/Carousel';
import readingList from '../mock/readingList.json';
import listeningList from '../mock/listeningList.json';

export default function HomePage() {
  return (
    <div className="max-w-[1440px] mx-auto mt-8 mb-24 flex flex-col gap-12">
      {/* 인기 리스닝 컨텐츠 캐러셀 */}
      <Carousel
        title="인기 리딩 컨텐츠"
        previewDatas={readingList}
        contentType="reading"
        itemWidth={320}
        itemsPerPage={3}
      />
      {/* 인기 리딩 컨텐츠 캐러셀 */}
      <Carousel
        title="인기 리스닝 컨텐츠"
        previewDatas={listeningList}
        contentType="listening"
        itemWidth={320}
        itemsPerPage={3}
      />
    </div>
  );
}
