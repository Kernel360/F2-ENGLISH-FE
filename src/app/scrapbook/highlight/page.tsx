'use client';

import MemoItem from '@/components/MemoItem';

interface MemoItemProps {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  description?: string;
}

const memoItems: MemoItemProps[] = [
  {
    id: '1',
    title: "제GPT보다 좋다고? '클로드'로 업무 생산성 높이기",
    content:
      '여러 기능을 살펴보고, 더 나아가 ChatGPT와 클로드, 두 강력한 생성형 AI를 어떻게 상황에 맞게 활용하여 업무 생산성을 극대화할 수 있는지 알아보겠습니다',
    timestamp: '2024.10.09. 오후 18:48 저장',
    description:
      '이 글은 AI 도구들의 비교와 활용에 대해 다루고 있어 유용해 보입니다.',
  },
  {
    id: '2',
    title: "제GPT보다 좋다고? '클로드'로 업무 생산성 높이기",
    content: "AI 모델 이름에 예술적 감성을 담아왔습니다. 'Haiku'",
    timestamp: '2024.10.09. 오후 16:38 저장',
    description: 'AI 모델 이름의 의미에 대해 더 알아보고 싶습니다.',
  },
  {
    id: '3',
    title: "제GPT보다 좋다고? '클로드'로 업무 생산성 높이기",
    content: '테스트 포맷팅이',
    timestamp: '2024.10.09. 오후 16:12 저장',
  },
];

export default function HighlighterAndMemo() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">형광펜과 메모</h1>
      <p className="text-sm text-muted-foreground">12개의 형광펜</p>
      {memoItems.map((item) => (
        <MemoItem key={item.id} item={item} />
      ))}
    </div>
  );
}
