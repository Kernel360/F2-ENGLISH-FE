'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import VideoPlayer from '@/components/VideoPlayer';
import { useParams } from 'next/navigation';
import { useContentDetail } from '@/api/hooks/useContentDetail';

export default function DetailListeningPage() {
  const param = useParams();
  const contentId = Number(param.id);

  const { data: ListeningDetailData, isLoading } = useContentDetail(contentId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex">
      <div className="flex flex-col flex-1 gap-5 mx-auto p-5 pb-16 max-w-[800px]">
        <div>
          <h1>타이틀</h1>
          <Badge>카테고리</Badge>
          <div className="text-sm flex justify-end w-full">조회수</div>
        </div>
        <Separator />

        <VideoPlayer scriptsData={ListeningDetailData?.data.scriptList} />
      </div>
    </div>
  );
}
