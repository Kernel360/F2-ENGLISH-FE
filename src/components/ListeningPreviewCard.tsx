'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { ListeningPreview } from '@/types';

export default function ListeningPreviewCard({
  data: { id, imageUrl, title, category },
}: {
  data: ListeningPreview;
}) {
  return (
    <Link href={`/learn/listening/detail/${id}`} className="mr-3">
      <Card className="w-80 h-46 max-w-sm overflow-hidden rounded-lg hover:shadow-card-hover">
        <CardContent className="p-0">
          <div className="relative w-80 h-44">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="100%"
              className="object-cover"
            />
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
      </div>
    </Link>
  );
}
