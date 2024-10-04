'use client';

import Data from '@/mock/readingDetailData.json';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowUp, Languages, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import ResponsiveSidebar from '@/components/ResponsiveSidebar';
import Quiz from '@/components/quiz/Quiz';
import quizData from '@/mock/quizData.json';

export default function DetailReadingPage() {
  const [showTranslate, toggleShowTranlation] = useState(true);
  const toggleTranslation = () => {
    toggleShowTranlation(!showTranslate);
  };

  // 북마크된 문장을 관리하는 배열
  const [bookMarkedSentences, setBookMarkedSentences] = useState<string[]>([]);

  const toggleBookmarking = (sentence: string) => {
    setBookMarkedSentences((prevBookmarkedSentences) => {
      if (prevBookmarkedSentences.includes(sentence)) {
        return prevBookmarkedSentences.filter((s) => s !== sentence);
      }

      return [...prevBookmarkedSentences, sentence];
    });
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-col flex-1 gap-5 mx-auto p-5 pb-[60px] md:pb-[0px] max-w-[800px]">
          <div>
            <Badge>카테고리</Badge>
            <div className="font-bold text-3xl mt-2 mb-4">{Data.title}</div>
            <div className="flex justify-end w-full">조회수</div>
          </div>
          <Separator />
          <div className="flex justify-center">
            <Image
              src={Data.thumbnail}
              width={600}
              height={400}
              alt="이미지"
              className="rounded-lg"
            />
          </div>
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
                  <Button
                    onClick={() => toggleBookmarking(script.enScript)} // 문장 전달
                    className={`absolute left-0 -bottom-4 transform -translate-y-1/2 p-1 rounded-full w-8 h-8 flex items-center justify-center transition-opacity ${
                      bookMarkedSentences.includes(script.enScript)
                        ? 'bg-green-500 text-white opacity-0 group-hover:opacity-100'
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
          <Quiz quizData={quizData[0]} />
        </div>

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
        <div className="fixed right-[16px] bottom-[76px] md:bottom-[16px]">
          <Button
            variant="default"
            className="rounded-full p-3 shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <ResponsiveSidebar
        bookMarkedSentences={bookMarkedSentences}
        toggleBookmarking={toggleBookmarking}
      />
    </>
  );
}
