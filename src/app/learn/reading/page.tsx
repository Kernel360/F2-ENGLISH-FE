import ArticlePreview from '@/components/ArticlePreview';
import readingList from '@/mock/readingList.json';

export default function ReadingPage() {
  return (
    <div className="max-w-[1080px] mx-auto pt-12">
      <ul className="flex flex-col gap-4">
        {readingList.map((item) => (
          <li key={item.id}>
            <ArticlePreview articlePreviewContent={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
