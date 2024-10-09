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
import {
  ArrowUp,
  Languages,
  HighlighterIcon,
  MessageCircleMoreIcon,
} from 'lucide-react';
import Image from 'next/image';
import quizData from '@/mock/quizData.json';
import QuizCarousel from '@/components/quiz/QuizCarousel';
import Data from '@/mock/readingDetailData.json';

type MemoType = {
  index: number; // 문장의 인덱스
  text: string; // 메모 내용
};

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

  const [memos, setMemos] = useState<MemoType[]>([]); // 메모 데이터 관리
  const [showMemo, setShowMemo] = useState<boolean>(false);
  const [memoText, setMemoText] = useState<string>(''); // 메모 내용 관리
  const [memoPosition, setMemoPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });
  const memoRef = useRef<HTMLDivElement>(null); // 메모의 위치를 참조하는 memoRef 추가

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
    setShowMemo(false); // 문장 클릭 시 메모 숨기기
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

  // 메모 버튼 클릭 시 메모 input 위치 조정 및 상태 업데이트
  const handleMemoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 메모 클릭 시 이벤트 전파 방지

    // 선택된 문장의 인덱스를 기반으로 문장 요소를 참조
    const sentenceElement = document.querySelector(
      `li[data-index="${selectedSentenceIndex}"] div`,
    );

    if (sentenceElement) {
      const rect = sentenceElement.getBoundingClientRect();
      setMemoPosition({
        top: rect.bottom + window.scrollY, // 문장의 바로 아래 위치
        left: rect.left + window.scrollX, // 문장의 시작 위치에 맞추기
      });
    }

    setTooltipVisible(false); // 메모 버튼 클릭 시 툴팁 숨기기
    setShowMemo(true); // 메모 입력창 표시
  };

  // 메모 저장 함수
  const handleSaveMemo = () => {
    if (selectedSentenceIndex !== null) {
      setMemos((prev) => {
        // 이미 메모가 있는 경우 수정 또는 삭제, 없는 경우 추가
        const existingMemoIndex = prev.findIndex(
          (memo) => memo.index === selectedSentenceIndex,
        );

        if (memoText.trim() === '') {
          // memoText가 빈 문자열일 경우 해당 메모 삭제
          if (existingMemoIndex >= 0) {
            const updatedMemos = [...prev];
            updatedMemos.splice(existingMemoIndex, 1); // 해당 메모 삭제
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

      // 메모 저장 후 memoText를 빈 문자열로 초기화
      setMemoText('');
      setShowMemo(false); // 메모 입력창 숨기기
    }
  };

  // 외부 클릭 시 툴팁, 메모, 선택된 문장 초기화
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // tooltipRef와 memoRef를 확인하고, 외부 클릭 시에만 상태 초기화
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        memoRef.current &&
        !memoRef.current.contains(event.target as Node)
      ) {
        setShowMemo(false); // 메모 숨기기
        setTooltipVisible(false); // 툴팁 숨기기
        setSelectedSentenceIndex(null); // 선택된 문장 초기화
      }
    };

    // 'mouseup' 이벤트를 사용하여 우선순위 문제 해결
    document.addEventListener('mouseup', handleClickOutside); // 문서 전체에 이벤트 추가
    return () => {
      document.removeEventListener('mouseup', handleClickOutside); // 이벤트 제거
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
              {Data.scripts.map((script, index) => {
                const memo = memos.find((m) => m.index === index);
                return (
                  <li
                    key={index}
                    data-index={index}
                    className="rounded relative leading-loose"
                  >
                    <div
                      onClick={(e) => handleSentenceClick(e, index)} // 문장 클릭 시 툴팁 표시
                      role="button"
                      tabIndex={0}
                      className={`w-fit cursor-pointer px-2 transition-colors duration-300
                        ${sentenceBookmarks.includes(index) || memo ? 'bg-yellow-200' : ''}
                        ${selectedSentenceIndex === index && !sentenceBookmarks.includes(index) ? 'bg-gray-100' : ''}
                        ${!sentenceBookmarks.includes(index) && !memo ? 'hover:bg-gray-100' : ''} 
                      `} // 북마크된 문장 또는 메모가 있는 문장은 항상 노란색, 클릭된 문장은 회색, 그 외는 호버 시 회색
                    >
                      {script.enScript}
                      {/* 메모가 있는 문장에 메모 아이콘 추가 */}
                      {memo && (
                        <span
                          style={{
                            marginLeft: '10px',
                            display: 'inline-flex',
                            cursor: 'pointer',
                          }}
                          onClick={(e) => {
                            e.stopPropagation(); // 메모 아이콘 클릭 시 이벤트 전파 방지
                            setMemoText(memo.text); // 기존 메모 내용을 설정
                            setSelectedSentenceIndex(index); // 선택된 문장 인덱스 설정
                            setMemoPosition({
                              top:
                                e.currentTarget.getBoundingClientRect().top +
                                window.scrollY +
                                20,
                              left:
                                e.currentTarget.getBoundingClientRect().left +
                                window.scrollX,
                            });
                            setShowMemo(true); // 메모 입력창 표시
                          }}
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
                  onClick={(e) => {
                    e.stopPropagation(); // 형광펜 버튼 클릭 시 외부 이벤트 전파 방지
                    handleAddBookmark();
                  }}
                >
                  <HighlighterIcon size="16px" color="gray" />
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
                  onClick={(e) => {
                    e.stopPropagation(); // 메모 버튼 클릭 시 외부 이벤트 전파 방지
                    handleMemoClick(e);
                  }}
                >
                  <MessageCircleMoreIcon size="16px" color="gray" />
                  메모
                </button>
              </div>
            )}
            {/* 메모 입력창 */}
            {showMemo && (
              <div
                ref={memoRef} // memoRef를 메모 input에 연결
                style={{
                  position: 'absolute',
                  top: memoPosition.top,
                  left: memoPosition.left,
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  padding: '15px',
                  zIndex: 1000,
                  fontSize: '14px',
                  width: '300px', // 메모 input 너비 조정
                }}
                onClick={(e) => e.stopPropagation()} // 메모 클릭 시 외부 이벤트 전파 방지
              >
                {/* 메모 input */}
                <textarea
                  value={memoText}
                  onChange={(e) => setMemoText(e.target.value)}
                  placeholder="메모를 입력해 주세요."
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    padding: '10px',
                    resize: 'none',
                    height: '60px',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    marginTop: '10px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setShowMemo(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'gray',
                      cursor: 'pointer',
                    }}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveMemo}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'blue',
                      cursor: 'pointer',
                    }}
                  >
                    저장
                  </button>
                </div>
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
