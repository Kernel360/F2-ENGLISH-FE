/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// const fetchDataByPageId = () => {
// todo : detailPage에서는 해당 페이지의 contentId로 데이터를 fetch하여 보여준다
// useparams로 받은 id로 fetch
//   Response.json();
// };

'use client';

import { useState, useEffect } from 'react';
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
import Modal from '@/components/Modal';

type BookmarkMemoType = {
  script_index: string; // 콘텐츠의 id
  sentence_index: number; // 문장의 index
  word_index?: number; // 단어의 index (필요한 경우 사용)
  description?: string; // 메모 내용
};

export default function DetailReadingPage() {
  const [showTranslate, setShowTranslate] = useState(true);
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<
    number | null
  >(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const [bookmarkMemos, setBookmarkMemos] = useState<BookmarkMemoType[]>([]);
  const [showMemo, setShowMemo] = useState<boolean>(false);
  const [memoText, setMemoText] = useState<string>('');
  const [memoPosition, setMemoPosition] = useState({ top: 0, left: 0 });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // 삭제 확인 모달 상태 추가

  const toggleTranslation = () => setShowTranslate((prev) => !prev);

  useEffect(() => {
    if (!tooltipVisible && !showMemo && !showDeleteModal) {
      // 툴팁이 닫히고 메모도 클릭하지 않고 삭제도 클릭하지 않았을 때만 선택된 문장 초기화
      setSelectedSentenceIndex(null);
    }
  }, [tooltipVisible, showMemo, showDeleteModal]);

  // 문장 클릭 시 툴팁 표시 및 선택된 문장 설정
  const handleSentenceClick = (
    e: React.MouseEvent<HTMLDivElement>,
    sentenceIndex: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 40,
      left: rect.left + window.scrollX + rect.width / 2,
    });
    setSelectedSentenceIndex(sentenceIndex);
    setTooltipVisible(true);
    setShowMemo(false);
  };

  // 북마크 추가 및 삭제 모달 표시 처리 함수
  const handleAddBookmark = () => {
    if (selectedSentenceIndex !== null) {
      const existingBookmark = bookmarkMemos.some(
        (item) => item.sentence_index === selectedSentenceIndex,
      );

      if (existingBookmark) {
        // 이미 북마크가 있는 경우, 삭제 확인 모달 표시
        setShowDeleteModal(true);
      } else {
        // 새로운 북마크 추가
        setBookmarkMemos((prev) => [
          ...prev,
          {
            // eslint-disable-next-line no-underscore-dangle
            script_index: Data._id.$oid,
            sentence_index: selectedSentenceIndex,
          },
        ]);
      }
      setTooltipVisible(false);
      setShowMemo(false); // 메모가 열려있을 때도 닫기(todo: 화인)
    }
  };

  // 삭제 확인 시 실행
  const handleDeleteBookmark = () => {
    if (selectedSentenceIndex !== null) {
      setBookmarkMemos((prev) =>
        prev.filter((item) => item.sentence_index !== selectedSentenceIndex),
      );
      setTooltipVisible(false);
      setShowMemo(false);
      setShowDeleteModal(false); // 모달 닫기
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

    const existingMemo = bookmarkMemos.find(
      (item) => item.sentence_index === selectedSentenceIndex,
    );
    setMemoText(existingMemo ? (existingMemo.description ?? '') : ''); // 기존 메모 내용이 있다면 로드, 없으면 빈 문자열
    setShowMemo(true);
    setTooltipVisible(false);
  };

  // 메모 아이콘 클릭 시 메모 보여주기
  const handleMemoIconClick = (
    sentenceIndex: number,
    description: string,
    e: React.MouseEvent<HTMLSpanElement>,
  ) => {
    e.stopPropagation(); // 이벤트 전파 방지
    const sentenceElement = document.querySelector(
      // TODO(@smosco): DOM 직업 접근하지 않고 useRef 사용하는 방식으로 변경
      `li[data-index="${sentenceIndex}"] div`,
    );
    if (sentenceElement) {
      const rect = sentenceElement.getBoundingClientRect();
      setMemoPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    setMemoText(description);
    setSelectedSentenceIndex(sentenceIndex);
    setShowMemo(true);
    setTooltipVisible(false);
  };

  // 메모 저장 함수
  const handleSaveMemo = () => {
    if (selectedSentenceIndex !== null) {
      setBookmarkMemos((prev) => {
        const updatedBookmarkMemos = [...prev];
        const memoIndex = updatedBookmarkMemos.findIndex(
          (item) => item.sentence_index === selectedSentenceIndex,
        );

        if (memoText.trim() === '') {
          // 빈 메모일 경우 제거
          if (memoIndex >= 0) updatedBookmarkMemos.splice(memoIndex, 1);
          return updatedBookmarkMemos;
        }

        if (memoIndex >= 0) {
          // 기존 메모 수정
          updatedBookmarkMemos[memoIndex].description = memoText;
        } else {
          // 새 메모 추가
          updatedBookmarkMemos.push({
            // eslint-disable-next-line no-underscore-dangle
            script_index: Data._id.$oid,
            sentence_index: selectedSentenceIndex,
            description: memoText,
          });
        }
        return updatedBookmarkMemos;
      });

      setMemoText(''); // 메모 저장 후 초기화
      setShowMemo(false); // 메모 입력창 닫기
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-col flex-1 gap-5 mx-auto p-5 pb-16 max-w-[800px]">
          <div>
            <Badge>카테고리</Badge>
            <div className="font-bold text-2xl mt-2 mb-4">{Data.title}</div>
            <div className="text-sm flex justify-end w-full">조회수</div>
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
            <ul className="flex flex-col gap-4 text-[#313131]">
              {Data.scripts.map((script, index) => {
                const bookmarkMemo = bookmarkMemos.find(
                  (item) => item.sentence_index === index,
                );
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
                      className={`w-fit cursor-pointer px-2 transition-colors duration-300 ${
                        bookmarkMemo ? 'bg-yellow-200' : ''
                      } ${selectedSentenceIndex === index ? 'bg-gray-200' : ''} ${!bookmarkMemo && 'hover:bg-gray-200'}`}
                    >
                      {script.enScript}
                      {bookmarkMemo?.description && (
                        <span
                          className="cursor-pointer ml-2 inline-flex"
                          onClick={(e) =>
                            handleMemoIconClick(
                              index,
                              bookmarkMemo.description ?? '',
                              e,
                            )
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
            {tooltipVisible && (
              <Tooltip
                position={tooltipPosition}
                onAddBookmark={handleAddBookmark}
                onAddMemo={handleMemoClick}
                onClose={() => setTooltipVisible(false)}
                isBookmarked={bookmarkMemos.some(
                  (item) => item.sentence_index === selectedSentenceIndex,
                )}
              />
            )}
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

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="삭제 확인"
          description="형광펜이랑 메모 다 사라져요. 그래도 삭제할까요?"
        >
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              취소
            </Button>
            <Button variant="destructive" onClick={handleDeleteBookmark}>
              삭제
            </Button>
          </div>
        </Modal>
      )}

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
