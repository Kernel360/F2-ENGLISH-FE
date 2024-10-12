/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowUp, Languages, MessageCircleMoreIcon } from 'lucide-react';
import quizData from '@/mock/quizData.json';
import QuizCarousel from '@/components/quiz/QuizCarousel';
import Tooltip from '@/components/Tooltip';
import MemoInput from '@/components/MemoInput';
import Modal from '@/components/Modal';
import { useContentDetail } from '@/api/hooks/useContentDetail';
import {
  useFetchBookmarks,
  useCreateBookmark,
  useUpdateBookmark,
  useDeleteBookmark,
} from '@/api/hooks/useBookmarks';
import { useParams } from 'next/navigation';

export default function DetailReadingPage() {
  const params = useParams();
  const contentId = Number(params.id);
  const { data, isLoading, isError, error } = useContentDetail(contentId);

  // 북마크 데이터 훅
  const { data: bookmarkData, refetch: refetchBookmarks } =
    useFetchBookmarks(contentId);
  const createBookmarkMutation = useCreateBookmark(contentId);
  const updateBookmarkMutation = useUpdateBookmark(contentId);
  const deleteBookmarkMutation = useDeleteBookmark(contentId);

  const [showTranslate, setShowTranslate] = useState(true);
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<
    number | null
  >(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

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
      const existingBookmark = bookmarkData?.data.some(
        (item) => item.sentenceIndex === selectedSentenceIndex,
      );

      if (existingBookmark) {
        // 이미 북마크가 있는 경우, 삭제 확인 모달 표시
        setShowDeleteModal(true);
      } else {
        createBookmarkMutation.mutate(
          {
            sentenceIndex: selectedSentenceIndex,
            wordIndex: 0,
            // description: '',
          },
          {
            onSuccess: () => {
              refetchBookmarks(); // 북마크 추가 후 데이터 갱신
            },
          },
        );
      }
      setTooltipVisible(false);
      setShowMemo(false); // 메모가 열려있을 때도 닫기(todo: 화인)
    }
  };

  // 삭제 확인 시 실행
  const handleDeleteBookmark = () => {
    if (selectedSentenceIndex !== null) {
      const bookmarkToDelete = bookmarkData?.data.find(
        (item) => item.sentenceIndex === selectedSentenceIndex,
      );

      if (bookmarkToDelete) {
        deleteBookmarkMutation.mutate(bookmarkToDelete.bookmarkId, {
          onSuccess: () => {
            refetchBookmarks(); // 북마크 삭제 후 데이터 갱신
          },
        });
      }
      setTooltipVisible(false);
      setShowMemo(false);
      setShowDeleteModal(false); // 모달 닫기
    }
  };

  // 메모 버튼 클릭 시 메모 input 위치 조정 및 상태 업데이트
  const handleMemoClick = () => {
    if (selectedSentenceIndex === null) return;

    // 선택된 문장의 DOM 엘리먼트를 찾음
    const sentenceElement = document.querySelector(
      `li[data-index="${selectedSentenceIndex}"] div`,
    );

    // 선택된 문장의 위치에 따라 메모 input 위치 설정
    if (sentenceElement) {
      const rect = sentenceElement.getBoundingClientRect();
      setMemoPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    // React Query 캐시에서 기존 메모 데이터를 가져옴
    const existingMemo = bookmarkData?.data.find(
      (item) => item.sentenceIndex === selectedSentenceIndex,
    );

    // 기존 메모가 있으면 메모 내용을 설정하고, 없으면 빈 문자열을 설정
    setMemoText(existingMemo ? (existingMemo.description ?? '') : '');

    // 메모 입력창 표시
    setShowMemo(true);

    // 툴팁 숨기기
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
  // 메모 저장 함수 - 메모가 존재하면 수정, 존재하지 않으면 생성
  const handleSaveMemo = () => {
    if (selectedSentenceIndex === null) return;

    const existingMemo = bookmarkData?.data.find(
      (item) => item.sentenceIndex === selectedSentenceIndex,
    );
    const memoTextTrimmed = memoText.trim();

    if (memoTextTrimmed === '') {
      // 메모 삭제
      if (existingMemo) {
        deleteBookmarkMutation.mutate(existingMemo.bookmarkId, {
          onSuccess: () => {
            refetchBookmarks(); // 북마크 삭제 후 목록 갱신
          },
        });
      }
      return;
    }

    if (existingMemo) {
      // 메모 수정 (기존 메모가 있는 경우)
      updateBookmarkMutation.mutate(
        { bookmarkId: existingMemo.bookmarkId, description: memoTextTrimmed },
        {
          onSuccess: () => {
            refetchBookmarks(); // 메모 수정 후 목록 갱신
          },
        },
      );
    } else {
      // 메모 생성 (기존 메모가 없는 경우)
      createBookmarkMutation.mutate(
        {
          sentenceIndex: selectedSentenceIndex,
          wordIndex: 0,
          description: memoTextTrimmed,
        },
        {
          onSuccess: () => {
            refetchBookmarks(); // 메모 생성 후 목록 갱신
          },
        },
      );
    }

    setMemoText(''); // 메모 저장 후 초기화
    setShowMemo(false); // 메모 입력창 닫기
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const contentData = data?.data;

  if (!contentData) return <div>No Content Data Available</div>;

  return (
    <>
      <div className="flex">
        <div className="flex flex-col flex-1 gap-5 mx-auto p-5 pb-16 max-w-[800px] h-auto">
          <div>
            <Badge>{contentData.category}</Badge>
            <div className="font-bold text-2xl mt-2 mb-4">
              {contentData.title}
            </div>
            <div className="text-sm flex justify-end w-full">조회수</div>
          </div>
          <Separator />
          <div className="flex justify-center">
            <img
              src={contentData.thumbnailUrl}
              alt="이미지"
              className="rounded-lg"
            />
          </div>
          <div>
            <ul className="flex flex-col gap-4 text-[#313131]">
              {contentData.scriptList.map((script, index) => {
                const bookmarkMemo = bookmarkData?.data.find(
                  (item) => item.sentenceIndex === index,
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
                isBookmarked={bookmarkData?.data.some(
                  (item) => item.sentenceIndex === selectedSentenceIndex, // sentenceIndex로 비교
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
