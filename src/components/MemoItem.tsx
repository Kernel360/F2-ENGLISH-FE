import Link from 'next/link';
import { Circle, Share2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface MemoItemProps {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  description?: string;
}

export default function MemoItem({ item }: { item: MemoItemProps }) {
  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <Link href={`/learn/reading/detail/${item.id}`}>
          <h2 className="text-sm font-medium hover:underline underline-offset-2">
            {item.title}
          </h2>
        </Link>
        <span className="text-xs text-muted-foreground">{item.timestamp}</span>
      </div>
      <div className="flex items-start space-x-2 mb-2">
        <Circle className="h-3 w-3 mt-1 text-muted-foreground" />
        <p className="text-sm text-muted-foreground flex-grow">
          {item.content}
        </p>
      </div>
      {item.description && (
        <div className="ml-5 pl-4 border-l-2 border-purple-700">
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      )}
      <div className="flex justify-end space-x-2 mt-2">
        <Button variant="ghost" size="icon" aria-label="Share">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Delete">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
