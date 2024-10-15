'use client';

import { Book, Bookmark, HelpCircle, Highlighter } from 'lucide-react';
import { useUserTime } from '@/api/hooks/useUserInfo';
import { calculateDaysBetweenDates } from '@/lib/calculateDaysBetweenDates';
import React, { useEffect, useState } from 'react';
import LearningTracker from '../side/LearningTracker';

export default function SideArea() {
  /* -- LearningTracker 로직 : 추후 분리 필요 -- */
  // mockData
  const mockDailyGoals = [
    {
      id: 'study',
      icon: <Book className="h-4 w-4" />,
      label: '10분 공부하기',
      completed: false,
    },
    {
      id: 'memo',
      icon: <Bookmark className="h-4 w-4" />,
      label: '메모 1개 남기기',
      completed: false,
    },
    {
      id: 'highlight',
      icon: <Highlighter className="h-4 w-4" />,
      label: '하이라이팅 1개 하기',
      completed: false,
    },
    {
      id: 'quiz',
      icon: <HelpCircle className="h-4 w-4" />,
      label: '퀴즈 1개 풀기',
      completed: false,
    },
  ];

  const mockHistory = [
    { date: '2023-06-15', completedMissions: 3 },
    { date: '2023-06-14', completedMissions: 2 },
    { date: '2023-06-13', completedMissions: 4 },
    { date: '2023-06-12', completedMissions: 0 },
    { date: '2023-06-11', completedMissions: 1 },
  ];
  // 누적학습일 의 탈을 쓴 가입일 데이터 // 추후 api만들어지면 변경 필요
  const { data: userMembershipDurationData } = useUserTime();

  const [totalLearningDays, setTotalLearningDays] = useState<number>(0);
  useEffect(() => {
    if (userMembershipDurationData?.data.createdAt) {
      const createdAt = new Date(userMembershipDurationData.data.createdAt);
      const today = new Date();
      const learningDays = calculateDaysBetweenDates(today, createdAt);
      setTotalLearningDays(learningDays);
    }
  }, [totalLearningDays, userMembershipDurationData?.data.createdAt]);
  /* -- LearningTracker 로직 -- */
  return (
    <div className="sticky mt-20 flex items-start w-[300px] h-auto p-4">
      <LearningTracker
        totalLearningDays={totalLearningDays}
        dailyGoals={mockDailyGoals}
        history={mockHistory}
      />
    </div>
  );
}
