'use client';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { formatViewCount } from '@/lib/utils';
import cardData from '@/mock/cardData.json';
import { Badge } from './ui/badge';

function Cards() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m">
        {cardData.map((card) => (
          <Card className="p-4" key={card.id}>
            <AspectRatio ratio={16 / 9}>
              <Image
                src={card.imageUrl}
                alt={card.title}
                className="rounded-md object-cover"
                fill
                // Add a placeholder or error handling for missing images
                onError={() =>
                  console.warn(`Failed to load image for ${card.title}`)
                }
                priority // Ensures fast loading for the first card
              />
            </AspectRatio>
            <Badge className="m-4 ml-0 mb-0">{card.category}</Badge>
            <CardTitle className="mt-4 p-0 truncate ...">
              {card.title}
            </CardTitle>
            {/* 2줄 이상 ...필요 */}
            {/* <CardDescription>`조회수 ${card.content}회`</CardDescription> */}
            <CardDescription>{formatViewCount(card.count)}</CardDescription>
          </Card>
        ))}
      </div>
    </main>
  );
}

export default Cards;
