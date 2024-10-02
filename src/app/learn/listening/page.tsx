import listeningList from '@/mock/listeningList.json';
import ContentsCard from '@/components/ContentsCard';

function listeningPage() {
  return (
    <main className="max-w-[1440px] mx-auto px-6 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m">
        {listeningList.map((card) => (
          <ContentsCard key={card.id} card={card} />
        ))}
      </div>
    </main>
  );
}

export default listeningPage;
