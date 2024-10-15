'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookHeadphones,
  Search,
  Bookmark,
  Bell,
  CircleUserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogInOutButton from '@/components/LogInOutButton';

export const navItems = [
  { name: '학습', href: '/learn/listening', icon: BookHeadphones },
  { name: '검색', href: '/search', icon: Search },
  { name: '스크랩', href: '/scrapbook/content', icon: Bookmark },
  { name: '마이페이지', href: '/mypage/profile', icon: CircleUserRound },
];

export function Header() {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-50 bg-[rgba(255,255,255,0.95)] border-b">
      <header className="flex items-center max-w-[1440px] h-16 mx-auto px-6">
        <Link href="/" className="text-lg font-semibold mr-6">
          Biengual
        </Link>
        <nav className="hidden md:flex md:items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`py-3 px-6 flex-shrink-0 font-semibold hover:text-primary ${
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
          <LogInOutButton />
        </div>
      </header>
    </div>
  );
}
