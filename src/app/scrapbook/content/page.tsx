import ArticlePreview from '@/components/ArticlePreview';

interface ContentItem {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  thumbnail?: string;
}

const contentItems: ContentItem[] = [
  {
    id: 1,
    title: '기획자가 알아야 할 건 왜 이렇게 많아요? 용어·개념 A to Z',
    author: 'smosco님의 스크랩북',
    date: '2024. 10. 10. 저장',
    description:
      '주석을 달아 유용IT가 글 모음 선물을 준비했습니다. 이번 주제는 기획자가 알아야 할 기획 용어와 개념 모음입니다. 기획자는 프로젝트의 방향을 정하고 팀을 이끄는 중요한 역할을 맡고 있습니다. 이러한 역할...',
    thumbnail:
      'https://images.unsplash.com/photo-1573496267526-08a69e46a409?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'AI도 UX 리서처가 될 수 있을까? AI 모더레이터 툴 리뷰',
    author: 'smosco님의 스크랩북',
    date: '2024. 10. 10. 저장',
    description:
      '최근 몇 년간 UX 리서치 분야에서 인공지능(AI)의 도입이 급격히 증가하고 있습니다. 과거에는 AI를 연구에 활용할 때 단순히 반복 작업을 자동화하거나, 빅데이터를 업무를 줄여주는 역할에 그칠 것이라 예상했지만, ...',
    thumbnail:
      'https://images.unsplash.com/photo-1573496267526-08a69e46a409?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: '개발자는 정말로 사라질까?',
    author: 'smosco님의 스크랩북',
    date: '2024. 10. 10. 저장',
    description:
      '주석을 달아 유용IT가 글 모음 선물을 준비했습니다. 이번 주제는 개발자의 미래입니다. 빠르게 성장하는 AI 도구가 개발의 영역을 침범하고 있습니다. 누군가는 개발자란 직업의 종말을, 누군가는 새로운 전성을,...',
    thumbnail:
      'https://images.unsplash.com/photo-1573496267526-08a69e46a409?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function RecentContent() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">최근 스크랩한 콘텐츠</h1>
      {contentItems.map((item) => (
        <ArticlePreview key={item.id} articlePreviewContent={item} />
      ))}
    </div>
  );
}
