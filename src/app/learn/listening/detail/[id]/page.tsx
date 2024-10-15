'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import VideoPlayer from '@/components/VideoPlayer';
import { useParams } from 'next/navigation';
import { useContentDetail } from '@/api/hooks/useContentDetail';
import QuizCarousel from '@/components/quiz/QuizCarousel';
import { useFetchQuiz } from '@/api/hooks/useQuiz';
import FloatingButtons from '@/components/FloatingButtons';
import {
  useCheckScrap,
  useCreateScrap,
  useDeleteScrap,
} from '@/api/hooks/useScrap';

export default function DetailListeningPage() {
  const param = useParams();
  const contentId = Number(param.id);

  const {
    data: ListeningDetailData,
    isLoading,
    isError,
    error,
  } = useContentDetail(contentId);

  const { data: checkScrap } = useCheckScrap(contentId);
  const createScrapMutation = useCreateScrap(contentId);
  const deleteScrapMutation = useDeleteScrap(contentId);

  const { data: quizData } = useFetchQuiz(contentId);

  const [isScrapped, setIsScrapped] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (checkScrap?.data) {
      setIsScrapped(checkScrap.data); // 서버에서 스크랩 여부를 받아와 상태 업데이트
    }
  }, [checkScrap]);

  const handleScrapToggle = () => {
    if (isScrapped) {
      // 스크랩 삭제
      deleteScrapMutation.mutate(undefined, {
        onSuccess: () => {
          setIsScrapped(false);
        },
      });
    } else {
      // 스크랩 생성
      createScrapMutation.mutate(undefined, {
        onSuccess: () => {
          setIsScrapped(true);
        },
      });
    }
  };

  if (isLoading) {
    return <p className="mt-8">로딩 중...</p>;
  }

  if (isError) {
    return (
      <p className="mt-8 text-red-500">에러가 발생했습니다: {error.message}</p>
    );
  }

  if (!ListeningDetailData || !ListeningDetailData.data) {
    return <p className="mt-8">리스닝 콘텐츠가 없습니다.</p>;
  }

  return (
    <div className="w-full flex flex-col ">
      <div>
        <h1>{ListeningDetailData?.data.title}</h1>
        <Badge>{ListeningDetailData?.data.category}</Badge>
        <div className="text-sm flex justify-end w-full">
          {ListeningDetailData?.data.hits} 회
        </div>
      </div>
      <Separator />

      {/* TODO(@smosco): response 타입 나누기 싫어서 타입 단언 */}
      <VideoPlayer
        videoUrl={ListeningDetailData?.data.videoUrl as string}
        scriptsData={ListeningDetailData?.data.scriptList}
      />

      {quizData && (
        <QuizCarousel quizListData={quizData.data['question-answer']} />
      )}

      {/* 번역, 스크랩 버튼 */}
      <FloatingButtons
        isScrapped={isScrapped}
        onScrapToggle={handleScrapToggle}
      />
    </div>
  );
}
