import React from 'react';
import SideArea from './SideArea';

export default function ContentInner({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex justify-center max-w-[1140px] mx-auto px-6">
      <div className="flex-1 w-[800px] p-4">{children}</div>
      <SideArea />
    </div>
  );
}
