import Image from 'next/image';
import Link from 'next/link';

interface ContentItem {
  articlePreviewContent: {
    id: number;
    title: string;
    author?: string;
    date?: string;
    views?: string;
    description: string;
    thumbnail?: string;
  };
}

export default function ArticlePreview({ articlePreviewContent }: ContentItem) {
  const { id, title, description, thumbnail } = articlePreviewContent;
  return (
    <Link href={`/learn/reading/detail/${id}`}>
      <div className="py-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-semibold mb-2 hover:underline underline-offset-2">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              {articlePreviewContent.views && articlePreviewContent.views}
              {articlePreviewContent.date && articlePreviewContent.date}
              {articlePreviewContent.author &&
                `· ${articlePreviewContent.author}`}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          {thumbnail && (
            <div className="flex-shrink-0">
              <Image
                src={thumbnail}
                alt=""
                width={108}
                height={108}
                className="rounded-md object-cover aspect-square"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
