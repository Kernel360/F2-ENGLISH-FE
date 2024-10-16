'use client';

import React from 'react';
// import { headers } from 'next/headers';
import { usePathname } from 'next/navigation';

import SideArea from './SideArea';

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // const header = headers();
  // const pathname = header.get('x-current-path');
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex justify-center max-w-[1140px] mx-auto">
      <p>{pathname}</p>
      <div className="flex-1 py-[60px]">{children}</div>
      {!pathname?.includes('/mypage') && <SideArea />}
    </div>
  );
}
