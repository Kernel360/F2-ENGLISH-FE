'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface ListeningCarouselItemProps {
  item: {
    id: number;
    imageUrl: string;
    title: string;
    category: string;
  };
}

export default function ListeningCarouselItem({
  item: { id, imageUrl, title, category },
}: ListeningCarouselItemProps) {
  return (
    <Link href={`/learn/listening/detail/${id}`} className="mr-4">
      <Card className="w-80 max-w-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-80 h-44 rounded-lg overflow-hidden">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
            <Badge className="absolute bottom-2 right-2 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>24:00</span>
            </Badge>
          </div>
        </CardContent>
      </Card>
      <div className="mt-2">
        <p className="w-fit bg-gray-200 text-xs font-bold px-2 py-0.5 rounded">
          {category}
        </p>
        <h3 className="font-bold line-clamp-2 break-words">{title}</h3>
      </div>
    </Link>
  );
}
