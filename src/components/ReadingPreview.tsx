import Link from 'next/link';
import Image from 'next/image';

interface ReadingPreviewProps {
  readingPreviewContent: {
    id: number;
    title: string;
    views: string;
    description: string;
    thumbnail: string;
  };
}

export default function ReadingPreview({
  readingPreviewContent,
}: ReadingPreviewProps) {
  const { id, title, views, description, thumbnail } = readingPreviewContent;

  return (
    <Link
      href={`/learn/reading/detail/${id}`}
      className="block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-center p-4">
        {/* 미리보기 타이틀, 내용 */}
        <div className="flex-grow mr-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            {views.toLocaleString()} views
          </p>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>
        {/* 미리보기 썸네일 */}
        <div className="flex-shrink-0">
          <Image
            className="h-24 w-24 object-cover rounded"
            src={thumbnail}
            alt="reading content thumbnail"
            width={100}
            height={100}
          />
        </div>
      </div>
    </Link>
  );
}
