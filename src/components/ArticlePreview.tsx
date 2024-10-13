import { Preview } from '@/types/Preview';
import Link from 'next/link';
import { removeFirstChar } from '@/lib/removeFirstChar';

export default function ArticlePreview({
  // TODO(@smosco): hits, 북마크 아이콘 추가
  data: { contentId, thumbnailUrl, title, category, preScripts, hits },
}: {
  data: Preview;
}) {
  return (
    <Link href={`/learn/reading/detail/${contentId}`}>
      <div className="py-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-semibold mb-2 hover:underline underline-offset-2">
              {title}
            </h2>
            <p className="text-sm mb-3">{category}</p>
            <p className="text-sm text-muted-foreground mb-3">{hits}회</p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {removeFirstChar(preScripts)}
            </p>
          </div>
          {thumbnailUrl && (
            <div className="flex-shrink-0 w-24">
              <img
                src={thumbnailUrl}
                alt="scrapThumbnail"
                className="rounded-md object-cover aspect-square"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
