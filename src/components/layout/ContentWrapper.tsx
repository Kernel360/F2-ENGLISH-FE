'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import SideArea from './SideArea';

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="flex justify-center max-w-[1140px] mx-auto">
      <div className="flex-1 py-[60px]">{children}</div>
      {!pathname?.includes('/mypage') && <SideArea />}
    </div>
  );
}
