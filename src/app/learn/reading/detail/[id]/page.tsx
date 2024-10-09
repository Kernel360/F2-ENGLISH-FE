/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// const fetchDataByPageId = () => {
// todo : detailPage에서는 해당 페이지의 contentId로 데이터를 fetch하여 보여준다
// useparams로 받은 id로 fetch
//   Response.json();
// };

// todo
// 1. script받아서 보여주는 부분 ui 디벨롭 필요

'use client';

import { useEffect, useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowUp, Languages } from 'lucide-react';
import Image from 'next/image';
import quizData from '@/mock/quizData.json';
import QuizCarousel from '@/components/quiz/QuizCarousel';
import Data from '@/mock/readingDetailData.json';

export default function DetailReadingPage() {
  const [showTranslate, toggleShowTranlation] = useState(true);
  const [sentenceBookmarks, setSentenceBookmarks] = useState<number[]>([]);
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<
    number | null
  >(null); // 선택된 문장의 인덱스
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const toggleTranslation = () => {
    toggleShowTranlation(!showTranslate);
  };

  // 문장 클릭 시 툴팁 표시 및 선택된 문장 설정
  const handleSentenceClick = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 40, // 툴팁 위치 조정
      left: rect.left + window.scrollX + rect.width / 2 - 50, // 툴팁 중앙 위치 조정
    });
    setSelectedSentenceIndex(index); // 클릭된 문장 상태로 관리
    setTooltipVisible(true); // 툴팁 표시
  };

  // 형광펜 버튼 클릭 시 북마크 추가 및 툴팁 숨기기
  const handleAddBookmark = () => {
    if (selectedSentenceIndex !== null) {
      setSentenceBookmarks((prev) =>
        prev.includes(selectedSentenceIndex)
          ? prev.filter((i) => i !== selectedSentenceIndex)
          : [...prev, selectedSentenceIndex],
      );
      setTooltipVisible(false); // 툴팁 숨기기
    }
  };

  // 외부 클릭 시 툴팁과 선택된 문장 초기화
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setTooltipVisible(false); // 툴팁 숨기기
        setSelectedSentenceIndex(null); // 선택된 문장 초기화
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex">
        {/* 아티클 컨텐츠 */}
        <div className="flex flex-col flex-1 gap-5 mx-auto p-5 pb-[60px] md:pb-[0px] max-w-[800px]">
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
            <ul className="flex flex-col gap-4 text-[##313131]">
              {Data.scripts.map((script, index) => (
                <li key={index} className="rounded relative leading-loose">
                  <div
                    onClick={(e) => handleSentenceClick(e, index)} // 문장 클릭 시 툴팁 표시
                    role="button"
                    tabIndex={0}
                    className={`w-fit cursor-pointer px-2 transition-colors duration-300
                      ${sentenceBookmarks.includes(index) ? 'bg-yellow-200' : ''}
                      ${selectedSentenceIndex === index && !sentenceBookmarks.includes(index) ? 'bg-gray-00' : ''}
                      ${!sentenceBookmarks.includes(index) ? 'hover:bg-gray-300' : ''} 
                    `} // 북마크된 문장은 항상 노란색, 클릭된 문장은 회색, 그 외는 호버 시 회색
                  >
                    {script.enScript}
                  </div>
                  {showTranslate && <p className="px-2">{script.koScript}</p>}
                </li>
              ))}
            </ul>
            {/* 툴팁 */}
            {tooltipVisible && (
              <div
                ref={tooltipRef}
                style={{
                  position: 'absolute',
                  top: tooltipPosition.top,
                  left: tooltipPosition.left,
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  padding: '10px 15px',
                  zIndex: 1000,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  transform: 'translate(-50%, -50%)', // 위치 조정을 위해 사용
                }}
                onClick={(e) => e.stopPropagation()} // 툴팁 클릭 시 이벤트 전파 방지
              >
                {/* 화살표 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    width: '0',
                    height: '0',
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderTop: '10px solid white',
                    transform: 'translate(-50%, 0)',
                  }}
                />
                {/* 버튼 아이템 */}
                <button
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px 10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#333',
                    gap: '5px',
                  }}
                  onClick={handleAddBookmark}
                >
                  형광펜
                </button>
                <button
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px 10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#333',
                    gap: '5px',
                  }}
                >
                  메모
                </button>
              </div>
            )}
          </div>
          <QuizCarousel quizListData={quizData} />
        </div>
      </div>

      {/* 번역 floating 버튼 */}
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
