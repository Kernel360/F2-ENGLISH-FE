'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ReadingPreview } from '@/types';
import { Badge } from './ui/badge';

export default function ReadingPreviewCard({
  data: { id, thumbnail, title, category, description },
}: {
  data: ReadingPreview;
}) {
  return (
    <Link href={`/learn/reading/detail/${id}`}>
      <Card className="overflow-hidden shadow-card hover:shadow-card-hover hover:border-border w-80 h-80 mr-3">
        <CardContent className="p-0 h-full">
          <div className="relative w-full h-40 rounded-t-lg overflow-hidden">
            <Image src={thumbnail} alt={title} fill className="object-cover" />
          </div>
          <div className="p-4 space-y-2 h-40">
            <Badge>{category}</Badge>
            <strong className="line-clamp-2 hover:underline underline-offset-2">
              {title}
            </strong>
            <p className="text-sm text-gray-500 text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
