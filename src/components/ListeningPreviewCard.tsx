'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { ListeningPreview } from '@/types/Preview';
import { removeFirstChar } from '@/lib/removeFirstChar';

export default function ListeningPreviewCard({
  // TODO(@smosco): hits 추가
  data: { contentId, thumbnailUrl, title, category, preScripts },
}: {
  data: ListeningPreview;
}) {
  return (
    <Link href={`/learn/listening/detail/${contentId}`} className="mr-3">
      <Card className="w-80 h-46 max-w-sm overflow-hidden rounded-lg hover:shadow-card-hover">
        <CardContent className="p-0">
          <div className="relative w-80 h-44">
            <img src={thumbnailUrl} alt={title} className="object-cover" />
            <Badge className="absolute bottom-2 right-2 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>24:00</span>
            </Badge>
          </div>
        </CardContent>
      </Card>
      <div className="mt-2">
        <Badge>{category}</Badge>
        <h3 className="font-bold line-clamp-2 break-words hover:underline underline-offset-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 text-muted-foreground line-clamp-2">
          {removeFirstChar(preScripts)}
        </p>
      </div>
    </Link>
  );
}
