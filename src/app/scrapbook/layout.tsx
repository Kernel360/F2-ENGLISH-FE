'use client';

import { Bookmark, Plus, HighlighterIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUserLoginStatus } from '@/api/hooks/useUserInfo';
import DisabledModal from '@/components/DisabledModal';

interface NavItemProps {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItemProps[] = [
  {
    title: '스크랩북',
    icon: <Bookmark className="h-4 w-4" />,
    href: '/scrapbook/content',
  },
  {
    title: '형광펜과 메모',
    icon: <HighlighterIcon className="h-4 w-4" />,
    href: '/scrapbook/highlight',
  },
];

function NavItem({ item, active }: { item: NavItemProps; active: boolean }) {
  return (
    <Link href={item.href} className="w-full">
      <Button
        variant="ghost"
        className={`w-full justify-start px-2 mb-2
          ${active && 'bg-purple-100 text-purple-700'}`}
      >
        <span className="flex items-center">
          <span
            className={`h-4 w-4
              ${active ? 'text-purple-700' : 'text-purple-500'}`}
          >
            {item.icon}
          </span>
          <span className="ml-2">{item.title}</span>
        </span>
      </Button>
    </Link>
  );
}

function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-background h-screen">
      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold mb-4">Navigation</h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </div>
      </div>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start">
          <Plus className="mr-2 h-4 w-4" />
          콜렉션 추가
        </Button>
      </div>
    </nav>
  );
}

export default function ScrapbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 로그인 권한 훅
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data; // 로그인 상태 확인
  const router = useRouter(); // login페이지로 이동
  // 로그읜 모달
  const [showLoginModal, setShowLoginModal] = useState(false); //권한 없을때 로그인 모달
  return (
    <>
      <div className="flex w-full mx-auto">
        <SideNav />
        <main className="flex-1">{children}</main>
      </div>

      {/* 로그인 안 되어있으면 로그인 해야만 하는 나갈 수 있는 모달 */}
      {!isLogin && (
        <DisabledModal
          isOpen={true}
          //onClose={() => setShowLoginModal(false)}
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
        </DisabledModal>
      )}
    </>
  );
}
