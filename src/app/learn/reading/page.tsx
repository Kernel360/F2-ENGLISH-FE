import ReadingPreview from '@/components/ReadingPreview';
import readingList from '@/mock/readingList.json';

export default function ReadingPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6">
      <ul className="flex flex-col gap-4">
        {readingList.map((item) => (
          <li key={item.id}>
            <ReadingPreview readingPreviewContent={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
