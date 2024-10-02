// todo : detailPage에서는 해당 페이지의 contentId로 데이터를 fetch하여 보여준다
// const fetchDataByPageId = () => {
//   Response.json();
// };

// todo
// 1. script받아서 보여주는 부분 ui 디벨롭 필요
// 2. script받아서 보여주는 부분 한 문장으로 할지, 문단으로 할지
// 3. 한글 자막 보여줄 때 hover로 할지 그냥 button만 누르면 보이게 할지

'use client';

import Data from '@/mock/readingDetailData.json';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowUp, Bookmark, Languages } from 'lucide-react';
import { useState } from 'react';
import BookmarkSidebar from '@/components/BookmarkSidebar';

export default function DetailReadingPage() {
  // {
  //   // params,
  //   // 이전 페이지에서 Link로 넘어온 params를 받아오는 부분인데 이 페이지에서 어떻게 사용해야 할지 모르겠음
  // }: {
  //   // params: { id: string };
  // },

  const [showTranslate, toggleShowTranlation] = useState(true);
  const toggleTranslation = () => {
    toggleShowTranlation(!showTranslate);
  };

  return (
    <div className="flex flex-row ">
      <div className="w-[1080px] flex">
        {/* MobileNav가 생겼을 때 일관성을 유지하기 위해 MobileNav 높이 60px만큼 pb-[60-px]설정 */}
        <div className="w-full  md:w-[800px] flex flex-col mx-6 pb-[60px] md:pb-[0px] ">
          {/* content 부분 */}

          <div className=" flex flex-col gap-2 my-3 justify-between items-start">
            <Badge>카테고리</Badge>
            <div className="font-bold text-3xl mt-2 mb-4">{Data.title}</div>
            <div className="flex justify-end w-full">조회수</div>
          </div>
          {/* 구분선 */}
          <Separator className="" />
          {/* 이미지 */}
          <div className="flex flex-col items-center">
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
            <ul className="overflow-auto mb-8 tracking-normal leading-loose ">
              {Data.scripts.map((script, index) => (
                <>
                  {/* eslint-disable-next-line react/no-array-index-key */}
                  <li key={index} className=" bg-white rounded shadow-mille">
                    <p>{script.enScript}</p>
                    {/* 번역버튼 눌렸을때만 한글 자막 보여줌 */}
                    {showTranslate && <p>{script.koScript}</p>}
                  </li>
                  {/* 문장 사이 줄바꿈 */}
                  <br />
                </>
              ))}
            </ul>
          </div>
        </div>
        {/* sidebar */}
        <div className=" hidden md:block">
          {/* bookmark에 pconly media query만들 수 있음 */}
          <BookmarkSidebar className="" />
        </div>
        {/* floating 버튼 */}
        <div className="fixed right-[60px] bottom-[76px] md:bottom-[16px]">
          <Button
            onClick={toggleTranslation}
            variant="default"
            className={`rounded-full p-3 shadow-lg ${showTranslate ? 'bg-blue-500 hover:bg-blue-500/90' : ''}`}
          >
            <Languages className="w-5 h-5" />
            {`번역${showTranslate ? 'ON' : 'OFF'}`}
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
    </div>
  );
}
