// detailPage에서는 해당 페이지의 contentId로 데이터를 fetch하여 보여준다

// const fetchDataByPageId = () => {
//   Response.json();
// };

import Data from '@/mock/readingDetailData.json';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function DetailReadingPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col items-center px-[10%]  md:mb-[1.5rem] max-w-[1024px] mb-[2.5rem]">
      <div className="flex flex-col gap-2 my-3 justify-between items-start w-full">
        <Badge>카테고리</Badge>
        <div className="font-bold text-3xl  mt-2 mb-4">{Data.title}</div>
        <div className="flex justify-end w-full">조회수</div>
        {/* 받는 Data 이름이 thumbnail이면 안 됨  */}
      </div>

      <Separator className="" />
      <div className="my-3">
        <Image
          src={Data.thumbnail}
          width={600}
          height={400}
          alt="이미지"
          className="rounded-lg"
        />
      </div>
      <ul className="overflow-auto mb-8 w-[800px] tracking-normal leading-loose">
        {/* 1문장씩 영/한 보여줌 */}
        {Data.scripts.map((script, index) => (
          <>
            <li key={index} className="relative group">
              {script.enScript}
              <div
                key={index}
                className="absolute opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-white rounded shadow-lg"
              >
                {script.koScript}
              </div>
            </li>
            <br />
            <br />
          </>
        ))}
      </ul>
      <div>플로팅 북마크 버튼</div>
      <div>플로팅 위로 올리기 버튼</div>
    </div>
  );
}
