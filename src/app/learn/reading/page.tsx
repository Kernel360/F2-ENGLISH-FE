import ReadingPreview from '@/components/ReadingPreview';
import readingContentData from '@/mock/readingContentData.json';

export default function ReadingPage() {
  return (
    <div className="max-w-3xl mx-auto pt-4 pb-24 px-4">
      <ul className="flex flex-col gap-4">
        {readingContentData.map((item) => (
          <li key={item.id}>
            <ReadingPreview readingPreviewContent={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
