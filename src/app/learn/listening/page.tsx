import cardData from '@/mock/cardData.json';
import ContentsCard from '@/components/ContentsCard';

function listeningPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m">
        {cardData.map((card) => (
          <ContentsCard key={card.id} card={card} />
        ))}
      </div>
    </main>
  );
}

export default listeningPage;
