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
  { name: '학습', href: '/', icon: BookHeadphones },
  { name: '챌린지', href: '/challenge', icon: Trophy },
  { name: '검색', href: '/search', icon: Search },
  { name: '스크랩', href: '/bookmark', icon: Bookmark },
  { name: '관리', href: '/mypage', icon: CircleUserRound },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              English
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-700 hover:text-gray-900 ${
                    pathname === item.href ? 'font-semibold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="default" className="hidden md:inline-flex">
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
