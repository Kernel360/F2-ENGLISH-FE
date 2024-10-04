import React from 'react';
import Quiz from './Quiz';
import Carousel from '../Carousel';

interface Word {
  text: string;
  index: number;
}

interface QuizData {
  id: number;
  question: string;
  words: Word[];
  answer: string;
}

interface QuizCarouselProps {
  quizListData: QuizData[];
}

export default function QuizCarousel({ quizListData }: QuizCarouselProps) {
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
