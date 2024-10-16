'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Modal from '@/components/Modal';
import VideoPlayer from '@/components/VideoPlayer';
import { useParams } from 'next/navigation';
import { useContentDetail } from '@/api/hooks/useContentDetail';
import { useUserLoginStatus } from '@/api/hooks/useUserInfo';
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

  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data; // 로그인 상태 확인
  const router = useRouter(); // login페이지로 이동
  const [showLoginModal, setShowLoginModal] = useState(false); //권한 없을때 로그인 모달

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
    // 로그인 권한 없으면 로그인 모달 띄우기
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }
    // 로그인 권한 있을때만
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
    return <p>로딩 중...</p>;
  }

  if (isError) {
    return <p className="text-red-500">에러가 발생했습니다: {error.message}</p>;
  }

  if (!ListeningDetailData || !ListeningDetailData.data) {
    return <p>리스닝 콘텐츠가 없습니다.</p>;
  }

  return (
    <div className="max-w-[830px] flex flex-col ">
      <div>
        <h1 className="text-2xl font-bold">
          {ListeningDetailData?.data.title}
        </h1>
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

      {/* 로그인 모달 */}
      {showLoginModal && (
        <Modal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          title="로그인이 필요합니다."
          description="이 기능을 이용하려면 로그인이 필요해요! "
        >
          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant="default"
              className="hover:bg-violet-900 w-full"
              onClick={() => router.push('/login')}
            >
              로그인 하러 가기
            </Button>
          </div>
        </Modal>
      )}

      {/* 번역, 스크랩 버튼 */}
      <FloatingButtons
        isScrapped={isScrapped}
        onScrapToggle={handleScrapToggle}
      />
    </div>
  );
}
