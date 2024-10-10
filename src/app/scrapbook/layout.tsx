'use client';

import { Bookmark, Plus, HighlighterIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

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
        className={`w-full justify-start px-2
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
      <div className="p-4">
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
          Add New
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
  return (
    <div className="flex max-w-[1080px] mx-auto pt-12">
      <SideNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
