/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// const fetchDataByPageId = () => {
// todo : detailPage에서는 해당 페이지의 contentId로 데이터를 fetch하여 보여준다
// useparams로 받은 id로 fetch
//   Response.json();
// };

'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowUp, Languages, MessageCircleMoreIcon } from 'lucide-react';
import Image from 'next/image';
import quizData from '@/mock/quizData.json';
import QuizCarousel from '@/components/quiz/QuizCarousel';
import Data from '@/mock/readingDetailData.json';
import Tooltip from '@/components/Tooltip';
import MemoInput from '@/components/MemoInput';

type MemoType = {
  index: number;
  text: string;
};

export default function DetailReadingPage() {
  const [showTranslate, setShowTranslate] = useState(true);
  const [sentenceBookmarks, setSentenceBookmarks] = useState<number[]>([]);
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<
    number | null
  >(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const [memos, setMemos] = useState<MemoType[]>([]);
  const [showMemo, setShowMemo] = useState<boolean>(false);
  const [memoText, setMemoText] = useState<string>('');
  const [memoPosition, setMemoPosition] = useState({ top: 0, left: 0 });

  const toggleTranslation = () => setShowTranslate((prev) => !prev);

  // 문장 클릭 시 툴팁 표시 및 선택된 문장 설정
  const handleSentenceClick = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 40,
      left: rect.left + window.scrollX + rect.width / 2,
    });
    setSelectedSentenceIndex(index);
    setTooltipVisible(true);
    setShowMemo(false);
  };

  // 형광펜 버튼 클릭 시 북마크 추가 및 툴팁 숨기기
  const handleAddBookmark = () => {
    if (selectedSentenceIndex !== null) {
      setSentenceBookmarks((prev) =>
        prev.includes(selectedSentenceIndex)
          ? prev.filter((i) => i !== selectedSentenceIndex)
          : [...prev, selectedSentenceIndex],
      );
      setTooltipVisible(false);
    }
  };

  // 메모 버튼 클릭 시 메모 input 위치 조정 및 상태 업데이트
  const handleMemoClick = () => {
    const sentenceElement = document.querySelector(
      `li[data-index="${selectedSentenceIndex}"] div`,
    );
    if (sentenceElement) {
      const rect = sentenceElement.getBoundingClientRect();
      setMemoPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    const existingMemo = memos.find(
      (memo) => memo.index === selectedSentenceIndex,
    );
    setMemoText(existingMemo ? existingMemo.text : ''); // 기존 메모 내용이 있다면 로드, 없으면 빈 문자열
    setShowMemo(true);
    setTooltipVisible(false);
  };

  // 메모 아이콘 클릭 시 메모 보여주기
  const handleMemoIconClick = (
    index: number,
    text: string,
    e: React.MouseEvent<HTMLSpanElement>,
  ) => {
    e.stopPropagation(); // 이벤트 전파 방지
    const sentenceElement = document.querySelector(
      `li[data-index="${index}"] div`,
    );
    if (sentenceElement) {
      const rect = sentenceElement.getBoundingClientRect();
      setMemoPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    setMemoText(text);
    setSelectedSentenceIndex(index);
    setShowMemo(true);
    setTooltipVisible(false);
  };

  // 메모 저장 함수
  const handleSaveMemo = () => {
    if (selectedSentenceIndex !== null) {
      setMemos((prev) => {
        const existingMemoIndex = prev.findIndex(
          (memo) => memo.index === selectedSentenceIndex,
        );
        if (memoText.trim() === '') {
          // 빈 메모일 경우 삭제
          if (existingMemoIndex >= 0) {
            const updatedMemos = [...prev];
            updatedMemos.splice(existingMemoIndex, 1);
            return updatedMemos;
          }
          return prev;
        }

        if (existingMemoIndex >= 0) {
          const updatedMemos = [...prev];
          updatedMemos[existingMemoIndex].text = memoText;
          return updatedMemos;
        }

        return [...prev, { index: selectedSentenceIndex, text: memoText }];
      });

      setMemoText(''); // 메모 저장 후 초기화
      setShowMemo(false); // 메모 입력창 닫기
    }
  };

  return (
    <>
      <div className="flex">
        {/* 아티클 컨텐츠 */}
        <div className="flex flex-col flex-1 gap-5 mx-auto p-5 pb-16 max-w-[800px]">
          {/* 글머리 */}
          <div>
            <Badge>카테고리</Badge>
            <div className="font-bold text-2xl mt-2 mb-4">{Data.title}</div>
            <div className="text-sm flex justify-end w-full">조회수</div>
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
            <ul className="flex flex-col gap-4 text-[#313131]">
              {Data.scripts.map((script, index) => {
                const memo = memos.find((m) => m.index === index);
                return (
                  <li
                    key={index}
                    data-index={index}
                    className="rounded relative leading-loose"
                  >
                    <div
                      onClick={(e) => handleSentenceClick(e, index)}
                      role="button"
                      tabIndex={0}
                      className={`w-fit cursor-pointer px-2 transition-colors duration-300 ${sentenceBookmarks.includes(index) || memo ? 'bg-yellow-200' : ''} ${
                        selectedSentenceIndex === index &&
                        !sentenceBookmarks.includes(index)
                          ? 'bg-gray-100'
                          : ''
                      } ${!sentenceBookmarks.includes(index) && !memo ? 'hover:bg-gray-100' : ''}`}
                    >
                      {script.enScript}
                      {/* 메모가 있는 문장에 메모 아이콘 추가 */}
                      {memo && (
                        <span
                          className="cursor-pointer ml-2 inline-flex"
                          onClick={(e) =>
                            handleMemoIconClick(index, memo.text, e)
                          }
                        >
                          <MessageCircleMoreIcon size="16px" color="purple" />
                        </span>
                      )}
                    </div>
                    {showTranslate && <p className="px-2">{script.koScript}</p>}
                  </li>
                );
              })}
            </ul>
            {/* 툴팁 */}
            {tooltipVisible && (
              <Tooltip
                position={tooltipPosition}
                onAddBookmark={handleAddBookmark}
                onAddMemo={handleMemoClick}
                onClose={() => setTooltipVisible(false)}
              />
            )}
            {/* 메모 입력창 */}
            {showMemo && (
              <MemoInput
                position={memoPosition}
                memoText={memoText}
                setMemoText={setMemoText}
                onSaveMemo={handleSaveMemo}
                onClose={() => setShowMemo(false)}
              />
            )}
          </div>
          <QuizCarousel quizListData={quizData} />
        </div>
      </div>

      {/* 번역 floating 버튼 */}
      <div className="fixed right-16 bottom-20 md:bottom-4">
        <Button
          onClick={toggleTranslation}
          variant="default"
          className={`rounded-full p-3 shadow-lg ${showTranslate ? 'bg-blue-500 hover:bg-blue-500/90' : ''}`}
        >
          <Languages className="w-5 h-5" />
          {`번역${showTranslate ? 'ON' : 'OFF'}`}
        </Button>
      </div>
      {/* scroll-top floating 버튼 */}
      <div className="fixed right-4 bottom-20 md:bottom-4">
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
