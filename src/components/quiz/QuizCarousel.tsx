import React, { useState } from 'react';
import Quiz from './Quiz';
import Carousel from '../Carousel';

interface Word {
  text: string;
  index: number;
}

interface Quiz {
  id: number;
  question: string;
  words: Word[];
  answer: string;
}

interface QuizCarouselProps {
  quizListData: Quiz[];
}

export default function QuizCarousel({ quizListData }: QuizCarouselProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

  return (
    <div className="w-full p-10 border rounded-lg mb-20">
      <Carousel
        previewDatas={quizListData}
        itemComponent={Quiz}
        itemWidth={640}
        itemsPerPage={1}
      />
    </div>
  );
}
