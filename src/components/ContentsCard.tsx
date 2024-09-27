import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { formatViewCount } from '@/lib/utils';

interface CardDataProps {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  count: number;
}

function ContentsCard({ card }: { card: CardDataProps }) {
  return (
    <Card className="p-4 transform transition-transform duration-300 hover:scale-105">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={card.imageUrl}
          alt={card.title}
          className="rounded-md object-cover"
          fill
          priority // Ensures fast loading for the first card
        />
      </AspectRatio>
      <Badge className="m-4 ml-0 mb-0">{card.category}</Badge>
      <CardTitle className="mt-4 p-0 line-clamp-2">{card.title}</CardTitle>
      <CardDescription>{formatViewCount(card.count)}</CardDescription>
    </Card>
  );
}

export default ContentsCard;
