'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookHeadphones,
  Search,
  Trophy,
  Bookmark,
  Bell,
  CircleUserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const navItems = [
  { name: '학습', href: '/learn', icon: BookHeadphones },
  { name: '챌린지', href: '/challenges', icon: Trophy },
  { name: '검색', href: '/search', icon: Search },
  { name: '스크랩', href: '/bookmarks', icon: Bookmark },
  { name: '마이페이지', href: '/mypage', icon: CircleUserRound },
];

export function Header() {
  const pathname = usePathname();

  return (
    <div className="z-50 bg-white border-b">
      <header className="flex items-center max-w-[1440px] h-16 mx-auto ">
        <Link href="/" className="text-xl font-bold mr-6">
          English
        </Link>
        <nav className="hidden md:flex md:items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`py-3 px-6 text-lg flex-shrink-0 ${
                pathname === item.href || pathname.startsWith(item.href)
                  ? 'font-bold'
                  : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center ml-auto">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="default" className="hidden md:inline-flex ml-4">
            로그아웃
          </Button>
        </div>
      </header>
    </div>
  );
}
