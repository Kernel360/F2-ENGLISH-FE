'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import VideoPlayer from '@/components/VideoPlayer';
import { useParams } from 'next/navigation';
import { useContentDetail } from '@/api/hooks/useContentDetail';
import QuizCarousel from '@/components/quiz/QuizCarousel';
import { useFetchQuiz } from '@/api/hooks/useQuiz';

export default function DetailListeningPage() {
  const param = useParams();
  const contentId = Number(param.id);

  const {
    data: ListeningDetailData,
    isLoading,
    isError,
    error,
  } = useContentDetail(contentId);

  const { data: quizData } = useFetchQuiz(contentId);

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
    <div className="flex">
      <div className="flex flex-col flex-1 gap-5 mx-auto pb-16 max-w-[1080px]">
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
      </div>
    </div>
  );
}
