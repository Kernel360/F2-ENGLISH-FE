// todo : detailPage에서는 해당 페이지의 contentId로 데이터를 fetch하여 보여준다
// const fetchDataByPageId = () => {
//   Response.json();
// };

'use client';

import Data from '@/mock/readingDetailData.json';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowUp, Languages } from 'lucide-react';
import { useState } from 'react';

export default function DetailReadingPage({
  params,
}: {
  params: { id: string };
}) {
  const [isTranslateButtonClicked, setTranslateButtonClicked] = useState(true);
  const toggleTranslation = () => {
    setTranslateButtonClicked(!isTranslateButtonClicked);
  };

  return (
    <>
      {/* MobileNav가 생겼을 때 일관성을 유지하기 위해 MobileNav 높이 60px만큼 pb-[60-px]설정 */}
      <div className="flex flex-col items-center px-[10%] py-[10%] max-w-[1024px] pb-[60px] md:pb-[0px]">
        <div className="flex flex-col gap-2 my-3 justify-between items-start w-full">
          <Badge>카테고리</Badge>
          <div className="font-bold text-3xl  mt-2 mb-4">{Data.title}</div>
          <div className="flex justify-end w-full">조회수</div>
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
        {/* 1문장씩 영/한 보여줌 */}
        <ul className="overflow-auto mb-8 w-[600px] tracking-normal leading-loose">
          {Data.scripts.map((script, index) => (
            <>
              {/* eslint-disable-next-line react/no-array-index-key */}
              <li key={index} className=" bg-white rounded shadow-mille">
                {script.enScript}
              </li>
              {/* 번역버튼 눌렸을때만 한글 자막 보여줌 */}
              {isTranslateButtonClicked && (
                <li key={index} className="  bg-white rounded shadow-mille">
                  {script.koScript}
                </li>
              )}
              {/* 문장 사이 줄바꿈 */}
              <br />
            </>
          ))}
        </ul>

        <div className="fixed right-[60px] bottom-[76px] md:bottom-[16px]">
          <Button
            onClick={toggleTranslation}
            variant="default"
            className={`rounded-full p-3 shadow-lg ${isTranslateButtonClicked ? 'bg-blue-500 hover:bg-blue-500/90' : ''}`}
          >
            <Languages className="w-5 h-5" />
            {`번역${isTranslateButtonClicked ? 'ON' : 'OFF'}`}
          </Button>
        </div>
        <div className="fixed right-[16px] bottom-[76px] md:bottom-[16px]">
          <Button
            variant="default"
            className="rounded-full p-3 shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
          {/* todo : 북마크 버튼도 필요  */}
        </div>
      </div>
    </>
  );
}
