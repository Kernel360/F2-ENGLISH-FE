'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface ReadingCarouselItemProps {
  item: {
    thumbnail: string;
    title: string;
    description: string;
    category: string;
  };
}

export default function ReadingCarouselItem({
  item,
}: ReadingCarouselItemProps) {
  return (
    <Link href="/learn" className="block px-2">
      <Card className="overflow-hidden shadow-card02 w-64 h-80">
        <CardContent className="p-0 h-full">
          <div className="relative w-full h-40 rounded-t-lg overflow-hidden">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 space-y-2 h-40">
            <p className="w-fit bg-gray-200 text-xs font-bold px-2 py-0.5 rounded">
              {item.category}
            </p>
            <strong className="line-clamp-2">{item.title}</strong>
            <p className="text-sm text-gray-500 text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
