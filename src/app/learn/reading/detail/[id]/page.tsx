// const fetchDataByPageId = () => {
// todo : detailPage에서는 해당 페이지의 contentId로 데이터를 fetch하여 보여준다
// useparams로 받은 id로 fetch
//   Response.json();
// };

// todo
// 1. script받아서 보여주는 부분 ui 디벨롭 필요

'use client';

import Data from '@/mock/readingDetailData.json';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowUp, Languages, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import ResponsiveSidebar from '@/components/BookmarkSidebar'
import quizData from '@/mock/quizData.json';
import QuizCarousel from '@/components/quiz/QuizCarousel';

export default function DetailReadingPage() {
  const [showTranslate, toggleShowTranlation] = useState(true);
  const toggleTranslation = () => {
    toggleShowTranlation(!showTranslate);
  };

  // 북마크된 문장을 관리하는 배열
  const [bookMarkedSentences, setBookMarkedSentences] = useState<string[]>([]);

  const toggleBookmark = (sentence: string) => {
    setBookMarkedSentences((prevBookmarkedSentences) => {
      if (prevBookmarkedSentences.includes(sentence)) {
        return prevBookmarkedSentences.filter((s) => s !== sentence);
      }
      // todo: api 연결 시 낙관적 업데이트 적용하기
      return [...prevBookmarkedSentences, sentence];
    });
  };

  return (
    <>
      <div className="flex">
        {/* 1. 아티클 */}
        <div className="flex flex-col flex-1 gap-5 mx-auto p-5 pb-[60px] md:pb-[0px] max-w-[800px]">
          {/* 글머리 */}
          <div>
            <Badge>카테고리</Badge>
            <div className="font-bold text-3xl mt-2 mb-4">{Data.title}</div>
            <div className="flex justify-end w-full">조회수</div>
          </div>
          {/* 구분선 */}
          <Separator />
          {/* 이미지 */}
          <div className="flex justify-center">
            <Image
              src={Data.thumbnail}
              width={600}
              height={400}
              alt="이미지"
              className="rounded-lg"
            />
          </div>
          {/* 본문 */}
          <div>
            <ul className="overflow-auto tracking-normal leading-loose">
              {Data.scripts.map((script, index) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="bg-white rounded shadow-mille relative group"
                >
                  <p>{script.enScript}</p>
                  {showTranslate && <p>{script.koScript}</p>}
                  <Button // 문장 북마크 버튼
                    onClick={() => toggleBookmark(script.enScript)}
                    className={`absolute left-0 -bottom-4 transform -translate-y-1/2 p-1 rounded-full w-8 h-8 flex items-center justify-center transition-opacity ${
                      bookMarkedSentences.includes(script.enScript)
                        ? 'bg-red-500 text-white opacity-0 group-hover:opacity-100'
                        : 'bg-blue-500 text-white opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {bookMarkedSentences.includes(script.enScript) ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </Button>
                  <br />
                </li>
              ))}
            </ul>
          </div>
          <QuizCarousel quizListData={quizData} />
        </div>
      </div>
      {/* 2. 북마크사이드바 */}
      <ResponsiveSidebar
        bookMarkedSentences={bookMarkedSentences}
        toggleBookmark={toggleBookmark}
      />
      {/* 번역 floating 버튼 */}
      <div className="fixed right-[60px] bottom-[76px] md:bottom-[16px]">
        <Button
          onClick={toggleTranslation}
          variant="default"
          className={`rounded-full p-3 shadow-lg ${
            showTranslate ? 'bg-blue-500 hover:bg-blue-500/90' : ''
          }`}
        >
          <Languages className="w-5 h-5" />
          {`번역${showTranslate ? 'ON' : 'OFF'}`}
        </Button>
      </div>
      {/* scroll-top floating 버튼 */}
      <div className="fixed right-[16px] bottom-[76px] md:bottom-[16px]">
        <Button
          variant="default"
          className="rounded-full p-3 shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </>
  );
}
